const express = require("express");
const router = express.Router();

// Nhung file controller
const controller = require("../../controllers/admin/auth.controller");
const validates = require("../../validates/admin/auth.validate");

router.get("/login", controller.login);
router.post("/login", validates.loginPost, controller.loginPost);
router.get("/logout", controller.logout);

// export file
module.exports = router;
