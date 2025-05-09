
const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
// Nhung file controller
const controller = require("../../controllers/admin/account.controller")
// Validate
const validates = require("../../validates/admin/account.validate");
router.get('/',controller.index);
router.get('/create',controller.create);
router.post('/create',
    upload.single("avatar"),
    uploadCloud.upload,
    validates.createAccountPost,
    controller.createPost
);

// export file
module.exports = router;