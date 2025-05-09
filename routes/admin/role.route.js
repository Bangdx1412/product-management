
const express = require('express');
const router = express.Router();

// Nhung file controller
const controller = require("../../controllers/admin/role.controller")
router.get('/',controller.index);
router.get('/permissions',controller.permissions);
router.patch('/permissions',controller.permissionsPatch);
router.get('/create',controller.create);
router.post('/create',controller.createPost);
router.get('/edit/:id',controller.edit);
router.patch('/edit/:id',controller.editPatch);

// export file
module.exports = router;