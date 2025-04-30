// Nhúng model vào để sử dụng
const Product = require("../../models/product.model")

// Nhúng helpers để sử dụng
// Hàm Tìm kiếm 
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require('../../helpers/search')
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
    const objectSearch = searchHelper(req.query)
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }
    // Phân trang pagination
    // Công thức: Vị trí bắt đầu lấy = (Trang hiện tại - 1) * Số phần từ mỗi trang
    let objectPagination = {
        currentPage: 1,
        limitItiem: 4
    }
    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page);
    }
    // Đếm số lượng sản phẩm
    const countProducts = await Product.countDocuments(find);
    // Tính ra số trang 
    const totalPage = Math.ceil(countProducts/objectPagination.limitItiem)
    // Thêm vào objectPagination một biến tên là totalPage
    objectPagination.totalPage = totalPage
    console.log(totalPage);
    
    console.log(objectPagination.currentPage);
    // Thêm skip
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItiem
    
    // Kết thúc phân trang

    // lấy dữ liệu từ database
    const products = await Product.find(find).limit(objectPagination.limitItiem).skip(objectPagination.skip)
    // console.log(products);
    
    res.render('admin/pages/products/index',{
        pageTitle:"Trang list product",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}