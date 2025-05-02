// Nhúng model vào để sử dụng
const Product = require("../../models/product.model");

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
  const products = await Product.find(find)
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

    default:
      break;
  }
};
// Xoa vinh vien
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  //   Xoa vinh vien
  await Product.deleteOne({ _id: id });
  res.redirect(req.get("Referrer") || "/");
};
