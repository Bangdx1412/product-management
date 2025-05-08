const ProductCategory = require("../../models/products-category.model")
const systemConfig = require("../../config/system");
const createTreeHelpers = require("../../helpers/createTree")
module.exports.index = async (req,res)=>{
    let find = {
        deleted: false,
      };

   
    const records = await ProductCategory.find(find)
    const newRecords = createTreeHelpers.tree(records)

    res.render('admin/pages/categories/index',{
        pageTitle:"Danh mục sản phẩm",
        records: newRecords
    })
}
module.exports.createPost = async (req,res)=>{
    let find = {
        deleted: false
    }
    // Lấy ra tất cả danh mục trong db
    const records = await ProductCategory.find(find)
    const newRecords = createTreeHelpers.tree(records)
 
    res.render('admin/pages/categories/create',{
        pageTitle:"Thêm danh mục mới",
        records: newRecords
    })
}

module.exports.createPostCategory = async (req, res) => {
    console.log(req.body);
    if(req.body.position == ""){
        // đếm số bản ghi trong bảng category
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    }else{
        req.body.position = parseInt(req.body.position)
    }
    const category = new ProductCategory(req.body);
    await category.save()
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    
  };