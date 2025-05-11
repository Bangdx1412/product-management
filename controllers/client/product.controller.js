

const Product = require('../../models/product.model');
const productsHelper = require("../../helpers/products")
// [GET] /products
module.exports.index = async (req,res)=>{
    // Get all products
  try {
    const products = await Product.find({
      status:"active",
      deleted:false
  })
  const productNew = productsHelper.priceNewProducts(products)
  res.render('client/pages/products/index',{
      pageTitle: "Trang danh sach san pham",
      products: productNew
  })
  } catch (error) {
    res.redirect(`/`);
  }
}
module.exports.detail = async (req,res)=>{
  
    try {
        const find = {
          deleted: false,
          slug: req.params.slug,
          status: "active"
        };
        const product = await Product.findOne(find);
    
        res.render("client/pages/products/detail", {
          pageTitle: product.title,
          product: product,
        });
      } catch (error) {
        res.redirect(`/products`);
      }

}