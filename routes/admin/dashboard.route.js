
const express = require('express');
const router = express.Router();

// Nhung file controller
const controller = require("../../controllers/admin/dashboard.controller")
router.get('/',controller.dashboard);

// export file
module.exports = router;