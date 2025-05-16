const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate.js"); 
module.exports.register = async (req, res) => {
  try {
    res.render("client/pages/user/register", {
      pageTitle: "Đăng ký tài khoản",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
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
    res.cookie("tokenUser", user.tokenUser);
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
module.exports.login = async (req, res) => {
  try {
    res.render("client/pages/user/login", {
      pageTitle: "Đăng nhập tài khoản",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
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
    res.cookie("tokenUser", user.tokenUser);
    req.flash("success", "Đăng nhập thành công");
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("tokenUser");
    req.flash("success", "Đăng xuất thành công");
    res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
module.exports.forgotPassword = async (req, res) => {
  try {
    res.render("client/pages/user/forgotPassword", {
      pageTitle: "Quên mật khẩu",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
module.exports.forgotPasswordPost = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email, deleted: false });
    if (!user) {
      req.flash("errors", "Email không tồn tại");
      res.redirect(req.get("Referrer") || "/");
      return;
    }
    // Nếu tồn tại email thì gửi mail
    // Lưu thông tin vào db
    const otp = generateHelper.generateRandomNumber(8);
    const objectForgotPassword = {
      email: email,
      otp: otp,
      expireAt: Date.now()
    }
    // Gui otp
    const forgotPassword = new ForgotPassword(objectForgotPassword);  
    await forgotPassword.save();
    // Gửi mail

    res.send("oke");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};