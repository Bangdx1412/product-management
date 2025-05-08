const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    title: String, //Ví dụ tiêu đề là: Sản phẩm 1
    description: String,
    permissions:{ //nhóm quyền
        type: Array,
        default:[]
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
const Role = mongoose.model("Role", roleSchema, "roles");

module.exports = Role;
