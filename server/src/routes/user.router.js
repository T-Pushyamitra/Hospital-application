const express = require('express');

const router = express.Router();

const {
  getUserListByRoleId,
  getUsersList,
  updateUser,
} = require('../controllers/user.controller');


router.route('/').get(getUsersList);
router.route('/:id').post(updateUser);
router.route('/role/:roleId').get(getUserListByRoleId);


module.exports = router;
