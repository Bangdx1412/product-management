// Nhúng model vào để sử dụng
const Product = require("../../models/product.model")

// [GET] /admin/products
// hàm để lấy ra tất cả list products
module.exports.listProduct = async(req,res)=>{
    // lấy dữ liệu từ database
    const products = await Product.find({
        deleted: false
    })
    console.log(products);
    
    res.render('admin/pages/products/index',{
        pageTitle:"Trang list product",
        products: products
    })
}