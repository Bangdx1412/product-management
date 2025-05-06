const express = require("express");
const multer = require("multer");



const upload = multer();
const router = express.Router();

// Nhung file controller
const controller = require("../../controllers/admin/product.controller");

// Nhúng file validates
const validates = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
// Router
router.get("/", controller.listProduct);
router.patch("/change-status/:status/:id", controller.updateStatus);
router.patch("/change-multi", controller.updateStatusProducts);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.createProduct);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validates.createProductPost,
  controller.createProductPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validates.createProductPost,
  controller.updateProduct
);

router.get("/show/:id", controller.show);

// export file
module.exports = router;
