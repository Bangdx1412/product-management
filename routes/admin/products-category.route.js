const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();

const controller = require("../../controllers/admin/products-category.controller")

const validates = require("../../validates/admin/products-category.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get("/",controller.index)
router.get("/create",controller.createPost)
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validates.createPost,
  controller.createPostCategory
);


module.exports = router;