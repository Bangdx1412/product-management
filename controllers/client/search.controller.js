
const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products");
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword || "";
    let newProduct = [];
    if(keyword){
        const regex = new RegExp(keyword, "i");
        const products = await Product.find({
           title: regex,
           status: "active",
           deleted:false
        });
    newProduct = productsHelper.priceNewProducts(products);  
    }   
  res.render("client/pages/search/index", {
    pageTitle: "Trang chu",
    keyword: keyword,
    products: newProduct,
  });
};
