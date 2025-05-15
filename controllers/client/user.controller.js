
const User = require("../../models/user.model");
const md5 = require("md5");
module.exports.register = async (req, res) => {
  try {
    res.render("client/pages/user/register", {
      pageTitle: "Đăng ký tài khoản",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
}
module.exports.registerPost = async (req, res) => {
  try {
    const existEmail = await User.findOne({ email: req.body.email });
    if (existEmail) {
      req.flash("errors", "Email đã tồn tại");
      res.redirect(req.get("Referrer") || "/");
      return;
    }
   req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    req.flash("success", "Đăng ký tài khoản thành công");
    res.cookie("tookenUser",user.tookenUser)
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
}
module.exports.login = async (req, res) => {
  try {
    res.render("client/pages/user/login", {
      pageTitle: "Đăng nhập tài khoản",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
}
module.exports.loginPost = async (req, res) => {
  try {
    const email = req.body.email;
    const password = md5(req.body.password);
    const user = await User.findOne({ email: email, deleted: false });
    if (!user) {
      req.flash("errors", "Email không tồn tại");
      res.redirect(req.get("Referrer") || "/");
      return;
    }
    if (user.password !== password) {
      req.flash("errors", "Mật khẩu không đúng");
      res.redirect(req.get("Referrer") || "/");
      return;
    }
    if (user.status === "inactive") {
      req.flash("errors", "Tài khoản đã bị khóa");
      res.redirect(req.get("Referrer") || "/");
      return;
    }
    res.cookie("tookenUser", user.tookenUser); 
    req.flash("success", "Đăng nhập thành công");
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
}