// Nhúng model vào để sử dụng
const Product = require("../../models/product.model");
// nhúng file config
const systemConfig = require("../../config/system")
// Nhúng helpers để sử dụng
// Hàm Tìm kiếm
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
// [GET] /admin/products
// hàm để lấy ra tất cả list products
module.exports.listProduct = async (req, res) => {
  // Xử lý logic
  // lấy ra reqest
  // console.log(req.query.status); //lấy dữ liệu trên url http://localhost:3000/admin/products?status=active => lấy ra active

  //    Đoạn để lấy ra trạng thái
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // Phân trang pagination
  // Công thức: Vị trí bắt đầu lấy = (Trang hiện tại - 1) * Số phần từ mỗi trang
  // Đếm số lượng sản phẩm
  const countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItiem: 4,
    },
    req.query,
    countProducts
  );

  // Kết thúc phân trang

  // lấy dữ liệu từ database
  // sort để sắp xếp theo điều kiện gì đó!
  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limitItiem)
    .skip(objectPagination.skip);
  // console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang list product",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};
// Update status 1 ban ghi
module.exports.updateStatus = async (req, res) => {
  // console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });
  req.flash('success', 'Cập nhật trạng thái thành công');
  res.redirect(req.get("Referrer") || "/");
};
// Update status nhieu ban ghi
module.exports.updateStatusProducts = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      res.redirect(req.get("Referrer") || "/");
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      res.redirect(req.get("Referrer") || "/");
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      res.redirect(req.get("Referrer") || "/");
      break;
    case "position":
      for (const item of ids) {
        // split để cắt chuỗi ví dụ trong chuỗi có - nó sẽ tìm và cắt đúng chỗ đấy biến nó thành mảng
        // console.log(item);
        // Sử dụng destructering để phá vỡ cấu trúc
        [id, position] = item.split("-");
        // Vì positon trong file model đang để kiểu Number nên phải ép nó về kiểu Number
        position = parseInt(position);

        // Vì mỗi positon là khác nhau nên sẽ update từng cái vì đã đang trong vòng lặp for
        await Product.updateOne(
          { _id: id },
          {
            position: position,
          }
        );
        console.log(id);
        console.log(position);
      }
      res.redirect(req.get("Referrer") || "/");
      break;
    default:
      break;
  }
};
// Xoa vinh vien va xoa mem
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  //  Xóa vĩnh viễn
  // await Product.deleteOne({ _id: id });
  // Xóa mềm sẽ cập nhật lại trường deleted
  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );
  res.redirect(req.get("Referrer") || "/");
};
// Thêm mới sản phẩm
module.exports.createProduct = async(req,res) =>{
  res.render("admin/pages/products/create",
    {pageTitle: 'Thêm mới sản phẩm'}
  );
}
module.exports.createProductPost = async(req,res) =>{
  // Lấy ra thông tin ảnh khi upload
  console.log(req.file);
  
  
  // Khi bên người dùng gửi dữ liệu sẽ gửi vào body và để lấy data trong body thì ta cần req.body
  // console.log(req.body);
  // Vì trong db có price, discountPercentage, stock, position là kiểu number vì vậy cần ép nó lại về kiểu number
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  // Check xem admin có gửi position k
  if(req.body.position == ""){
    // Đếm số lượng sản phẩm trong db để sử lý thằng position
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
    console.log(req.body);
  }else{
    // ngược lại nếu mà người dùng có truyền vào thì lúc gửi lên sẽ là kiểu string vì vậy cần ép lại thành number
    req.body.position = parseInt(req.body.position)
  }
  req.body.thumbnail = `/uploads/${req.file.filename}`;
  // Tạo đối tượng sản phẩm mới nhưng chưa lưu vào db
  const product = new Product(req.body)
  // Lưu vào db
  await product.save();
  
  res.redirect(`${systemConfig.prefixAdmin}/products`)
}
