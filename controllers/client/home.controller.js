
const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
module.exports.index = async (req, res) => {
  // Lấy ra sản phẩm nối bật
  const productFeatured = await Product.find({
    featured: "1",
    status:"active",
    deleted:false
  }).limit(8)
  // Lấy ra sản phẩm mới nhất
  const productsNew = await Product.find({
    deleted: false,
    status:"active"
  }).limit(8).sort({position:"desc"});

  // Lấy ra giá khuyến mãi của sản phẩm nổi bật
  const featuredProduct = productsHelper.priceNewProducts(productFeatured)

  // Lấy ra giá khuyến mãi của sản phẩm mới
  const newProducts = productsHelper.priceNewProducts(productsNew)
  res.render("client/pages/home/index", {
    pageTitle: "Trang chu",
    productFeatured: featuredProduct,
    productsNew : newProducts
  });
};
