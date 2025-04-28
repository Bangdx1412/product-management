// [GET] /admin/products

module.exports.listProduct = (req,res)=>{
    res.render('admin/pages/products/index',{
        pageTitle:"Trang list product"
    })
}