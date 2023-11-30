const express = require('express');

const router = express.Router();

const {
  getUserListByRoleId,
  getLoggedInUser,
  getUsersList,
  updateUser,
} = require('../controllers/user.controller');

const { auth, permit } = require('../middlewares/auth.middleware');

router.route("/").get(auth, getLoggedInUser);
router.route('/list').get(auth, permit(['CAN_READ_USER']), getUsersList);
router.route('/:id').post(updateUser);
router.route('/role/:roleId').get(getUserListByRoleId);

module.exports = router;
