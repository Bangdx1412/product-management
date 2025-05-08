
const express = require('express');
const router = express.Router();

// Nhung file controller
const controller = require("../../controllers/admin/role.controller")
router.get('/',controller.index);
router.get('/create',controller.create);
router.post('/create',controller.createPost);

// export file
module.exports = router;