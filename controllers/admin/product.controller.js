// Nhúng model vào để sử dụng
const Product = require("../../models/product.model");
const ProductCategory = require("../../models/products-category.model");
// nhúng file config
const systemConfig = require("../../config/system");
// Nhúng helpers để sử dụng
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const createTreeHelpers = require("../../helpers/createTree");
// [GET] /admin/products
// hàm để lấy ra tất cả list products
module.exports.listProduct = async (req, res) => {
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
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItiem)
    .skip(objectPagination.skip);
  res.render("admin/pages/products/index", {
    pageTitle: "Trang list product",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};
module.exports.updateStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái thành công");
  res.redirect(req.get("Referrer") || "/");
};
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
// Điều hướng sang trang create.pug
module.exports.createProduct = async (req, res) => {
  let find = {
    deleted: false,
  };

  const category = await ProductCategory.find(find);
  const newCategory = createTreeHelpers.tree(category);
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
    category: newCategory,
  });
};
// Tạo mới sản phẩm
module.exports.createProductPost = async (req, res) => {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.body.position == "") {
      const countProducts = await Product.countDocuments();
      req.body.position = countProducts + 1;
      // console.log(req.body);
    } else {
      req.body.position = parseInt(req.body.position);
    }

    // Tạo đối tượng sản phẩm mới nhưng chưa lưu vào db
    const product = new Product(req.body);
    // Lưu vào db
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
  } catch (error) {
    res.redirect(req.get("Referrer") || "/");
  }
};

module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
  
    const category = await ProductCategory.find({
      deleted: false,
    });
    const newCategory = createTreeHelpers.tree(category);
    const product = await Product.findOne(find);

    res.render("admin/pages/products/edit", {
      pageTitle: "Update Product",
      product: product,
      category:newCategory
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

module.exports.updateProduct = async (req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  try {
    await Product.updateOne({ _id: id }, req.body);
  } catch (error) {
    res.redirect(req.get("Referrer") || "/");
  }
  res.redirect(req.get("Referrer") || "/");
};

// Xem chi tiết sản phẩm
module.exports.show = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);

    res.render("admin/pages/products/show", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
