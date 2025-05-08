const mongoose = require("mongoose");
// Thư viện tạo slug
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema(
  {
    title: String, 
    parent_id: {
        type: String,
        default: ""
    }, 
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
      type: String, //slug sẽ là: san-pham-1
      slug: "title", //Ăn theo title
      unique: true,
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
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "products-category");

module.exports = ProductCategory;
