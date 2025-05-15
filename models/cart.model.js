const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    user_id: String,
    products:[
        {
            product_id:String,
            quantity: Number,
        }
    ]
  },
  {
    // Thêm createdAt , updatedAt đây là thuộc tính có sẵn của mongoose mục Timestamps
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;
