const mongoose = require("mongoose");
const generate = require("../helpers/generate")
const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    email:String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomString(20)
    },
    phone: String,
    avatar:String,
    role_id: String,
    status: String,
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
const Product = mongoose.model("Product", accountSchema, "products");

module.exports = Product;
