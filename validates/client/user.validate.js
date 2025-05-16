module.exports.registerPost = (req,res,next)=>{
     // Validate
  if (!req.body.fullName) {
    req.flash("errors", "Vui lòng nhập Họ và Tên");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  if (!req.body.email) {
    req.flash("errors", "Vui lòng nhập email");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  if (!req.body.password) {
    req.flash("errors", "Vui lòng nhập mật khẩu");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  next();
}
module.exports.loginPost = (req,res,next)=>{
     // Validate
  if (!req.body.email) {
    req.flash("errors", "Vui lòng nhập email");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  if (!req.body.password) {
    req.flash("errors", "Vui lòng nhập mật khẩu");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  next();
}
module.exports.forgotPasswordPost = (req,res,next)=>{
     // Validate
  if (!req.body.email) {
    req.flash("errors", "Vui lòng nhập email");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
 
  next();
}
module.exports.resetPasswordPost = (req,res,next)=>{
     // Validate
  if (!req.body.password) {
    req.flash("errors", "Vui lòng nhập mật khẩu");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  if (!req.body.confirmPassword) {
    req.flash("errors", "Vui lòng nhập xác nhận mật khẩu");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  if(req.body.password !== req.body.confirmPassword){
    req.flash("errors", "Mật khẩu không khớp");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
 
  next();
}
