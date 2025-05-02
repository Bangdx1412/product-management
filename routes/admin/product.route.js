
const express = require('express');
const router = express.Router();

// Nhung file controller
const controller = require("../../controllers/admin/product.controller")
router.get('/',controller.listProduct);
router.patch('/change-status/:status/:id',controller.updateStatus);
router.patch('/change-multi',controller.updateStatusProducts);

// export file
module.exports = router;