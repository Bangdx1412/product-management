
const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
module.exports.index = async (req, res) => {
  // Lấy ra sản phẩm nối bật
  const productFeatured = await Product.find({
    featured: "1",
    status:"active",
    deleted:false
  }).limit(8)
  const productNew = productsHelper.priceNewProducts(productFeatured)
  res.render("client/pages/home/index", {
    pageTitle: "Trang chu",
    productFeatured: productNew
  });
};
