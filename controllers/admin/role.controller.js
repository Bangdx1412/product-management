const Role = require("../../models/role.model")
const systemConfig = require("../../config/system");
// [GET] /admin/dashboard
module.exports.index = async (req,res)=>{
    let find = {
        deleted:false
    }
    const records = await Role.find(find)
    res.render('admin/pages/roles/index',{
        pageTitle: "Nhóm quyền",
        records: records
    })
}
module.exports.create = async (req,res)=>{
   
    res.render('admin/pages/roles/create',{
        pageTitle: "Create Quyen",
    })
}
module.exports.createPost = async (req,res)=>{
    console.log(req.body);
    const records = new Role(req.body)
    await records.save()
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}