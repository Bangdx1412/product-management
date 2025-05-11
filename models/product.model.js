const mongoose = require("mongoose");
// Thư viện tạo slug
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
  {
    title: String, //Ví dụ tiêu đề là: Sản phẩm 1
    product_category_id:{
      type: String,
      default: ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
      type: String, //slug sẽ là: san-pham-1
      slug: "title", //Ăn theo title
      unique: true,
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
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
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
