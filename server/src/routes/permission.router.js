const express = require('express');

const router = express.Router();

const {
  getPermissionsList,
  createNewPermission,
  updatePermission,
} = require('../controllers/permission.controller');
const { auth, permit } = require('../auth/auth.middleware');

router.route('/').get(getPermissionsList).post(createNewPermission);
router.route('/:id').post(auth, updatePermission);

module.exports = router;
