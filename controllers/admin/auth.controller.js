const md5 = require("md5");
const Account = require("../../models/account.model");
const flash = require("express-flash");
const systemConfig = require("../../config/system");
// [GET] /admin/auth/login
module.exports.login = (req,res)=>{
    res.render('admin/pages/auth/login',{
        pageTitle: "Đăng nhập"
    })
}
module.exports.loginPost = async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await Account.findOne({
        email:email,
        deleted:false
    })
    if(!user){
        req.flash("errors","Email không tồn tại!!!")
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    if(md5(password) !== user.password){
        req.flash("errors","Sai mật khẩu!!!")
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    
    if(user.status == "inactive"){
        req.flash("errors","Tài khoản đã bị khóa!!!")
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    res.cookie("token",user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}