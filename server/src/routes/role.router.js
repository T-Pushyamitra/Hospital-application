const express = require('express');

const router = express.Router();

const {
  getRolesList,
  createNewRole,
  updateRole,
  addPermissionsToRole,
} = require('../controllers/role.controller');

router.route('/').get(getRolesList).post(createNewRole);
router.route('/role_permission').post(addPermissionsToRole);
router.route('/:id').post(updateRole);

module.exports = router;
