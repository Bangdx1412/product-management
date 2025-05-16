const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate.js");
const sendMailhelper = require("../../helpers/sendMail.js");
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
    const tokenUser = generateHelper.generateRandomString(20);
    req.body.tokenUser = tokenUser;
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
      expireAt: Date.now(),
    };
    // Gui otp
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    // Gửi mail
    const subject = "Mã OTP đặt lại mật khẩu";
    const html = `
        <h2>Xin chào ${user.fullName}</h2>
        <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
        <p>Vui lòng không chia sẻ mã OTP này với bất kỳ ai.</p>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        `;
    sendMailhelper.sendMail(email, subject, html);

    res.redirect(`/user/password/otp/?email=${email}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
module.exports.otpPassword = async (req, res) => {
  try {
    const email = req.query.email;
    res.render("client/pages/user/otpPassword", {
      pageTitle: "Nhập mã OTP",
      email: email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
module.exports.otpPasswordPost = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    const result = await ForgotPassword.findOne({
      email: email,
      otp: otp,
    });
    if (!result) {
      req.flash("errors", "Mã OTP không hợp lệ");
      res.redirect(req.get("Referrer") || "/");
      return;
    }
    const user = await User.findOne({ email: email });
    res.cookie("tokenUser", user.tokenUser);

    res.redirect(`/user/password/reset`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
module.exports.resetPassword = async (req, res) => {
  try {
    res.render("client/pages/user/resetPassword", {
      pageTitle: "Đặt lại mật khẩu",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
module.exports.resetPasswordPost = async (req, res) => {
  try {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;
    await User.updateOne(
      {
        tokenUser: tokenUser,
      },
      {
        password: md5(password),
      }
    );
    req.flash("success", "Đặt lại mật khẩu thành công");
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
module.exports.info = async (req, res) => {
  try {
    
    res.render("client/pages/user/info", {
      pageTitle: "Thông tin cá nhân",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
