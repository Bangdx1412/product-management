const express = require("express");
const multer = require("multer");
// Nhúng file storageMulrer để sửa lại tên file ảnh
const storageMulter = require("../../helpers/storageMulter")
const upload = multer({ storage: storageMulter() })
const router = express.Router();

// Nhung file controller
const controller = require("../../controllers/admin/product.controller");
router.get("/", controller.listProduct);
router.patch("/change-status/:status/:id", controller.updateStatus);
router.patch("/change-multi", controller.updateStatusProducts);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.createProduct);
router.post(
  "/create",
  upload.single("thumbnail"),
  controller.createProductPost
);

// export file
module.exports = router;
