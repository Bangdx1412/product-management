// Nhúng model vào để sử dụng
const Product = require("../../models/product.model")

// Nhúng helpers để sử dụng
// Hàm Tìm kiếm 
const filterStatusHelper = require("../../helpers/filterStatus");

// [GET] /admin/products
// hàm để lấy ra tất cả list products
module.exports.listProduct = async(req,res)=>{
    // Xử lý logic
    // lấy ra reqest
    // console.log(req.query.status); //lấy dữ liệu trên url http://localhost:3000/admin/products?status=active => lấy ra active


//    Đoạn để lấy ra trạng thái
    const filterStatus = filterStatusHelper(req.query); 

    let find = {
        deleted: false
    }
    if( req.query.status){
        find.status =  req.query.status
    }
    let keyword = "";
    if(req.query.keyword){
        keyword = req.query.keyword
        // dung regex trong js de tim kiem
        const regex = new RegExp(keyword,'i')
        find.title = regex;
    }
    // lấy dữ liệu từ database
    const products = await Product.find(find)
    // console.log(products);
    
    res.render('admin/pages/products/index',{
        pageTitle:"Trang list product",
        products: products,
        filterStatus: filterStatus
        ,keyword: keyword
    })
}