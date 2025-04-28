const Product = require('../../models/product.model');
module.exports.index = async (req,res)=>{
    // Get all products
    const products = await Product.find({
        status:"active",
        deleted:"false"
    })
    const productNew = products.map(item=>{
        item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0)
        return item
    })
   
    
    console.log(productNew);
    
    res.render('client/pages/products/index',{
        pageTitle: "Trang danh sach san pham",
        products: productNew
    })
}