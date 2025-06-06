const mongoose = require("mongoose");
const generate = require("../helpers/generate")
const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email:String,
    password: String,
    tokenUser: {
        type: String,
        default: generate.generateRandomString(20)
    },
    phone: String,
    avatar:String,
    status: {
        type: String,
        default: "active",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    // Thêm createdAt , updatedAt đây là thuộc tính có sẵn của mongoose mục Timestamps
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
