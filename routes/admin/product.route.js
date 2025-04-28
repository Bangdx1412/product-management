
const express = require('express');
const router = express.Router();

// Nhung file controller
const controller = require("../../controllers/admin/product.controller")
router.get('/',controller.listProduct);

// export file
module.exports = router;