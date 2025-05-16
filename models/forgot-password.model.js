const mongoose = require("mongoose");
const forgotPasswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    // xét thời gian hết hạn của otp
    expireAt: {
      type: Date,
      expires: 180,
    },
  },
  {
    // Thêm createdAt , updatedAt đây là thuộc tính có sẵn của mongoose mục Timestamps
    timestamps: true,
  }
);
const ForgotPassword = mongoose.model(
  "ForgotPassword",
  forgotPasswordSchema,
  "forgot-password"
);

module.exports = ForgotPassword;
