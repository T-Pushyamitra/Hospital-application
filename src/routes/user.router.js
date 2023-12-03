const express = require("express")
const router = express.Router()

const { getUserListByPhoneNumber, getUsersList, createNewUser, updateUser } = require("../controllers/user.controller");


router.route("/users").get(getUsersList).post(createNewUser);
router.route("/user/:id").put(updateUser);
router.route("^/users/:phoneNumber([0-9]+)").get(getUserListByPhoneNumber);

module.exports = router;
