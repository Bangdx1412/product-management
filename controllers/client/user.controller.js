
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