// Nhúng model vào để sử dụng
const Product = require("../../models/product.model")

// [GET] /admin/products
// hàm để lấy ra tất cả list products
module.exports.listProduct = async(req,res)=>{
    // Xử lý logic
    // lấy ra reqest
    console.log(req.query.status); //lấy dữ liệu trên url http://localhost:3000/admin/products?status=active => lấy ra active


    let filterStatus = [
        {
            name: 'Tất cả',
            status: "",
            class: ""
        },
        {
            name: 'Hoạt động',
            status: "active",
            class: ""
        },
        {
            name: 'Ngừng hoạt động',
            status: "inactive",
            class: ""
        },
    ]
    if(req.query.status){
        const index = filterStatus.findIndex(item=>item.status == req.query.status)
        filterStatus[index].class = "active"
    }else{
        const index = filterStatus.findIndex(item=>item.status == "")
        filterStatus[index].class = "active"
    }
    let find = {
        deleted: false
    }
    if( req.query.status){
        find.status =  req.query.status
    }
    
    // lấy dữ liệu từ database
    const products = await Product.find(find)
    // console.log(products);
    
    res.render('admin/pages/products/index',{
        pageTitle:"Trang list product",
        products: products,
        filterStatus: filterStatus
    })
}