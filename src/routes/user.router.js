const express = require("express")
const router = express.Router()

const { getUserListByPhoneNumber, getUsersList, createNewUser, updateUser } = require("../controllers/user.controller");


const auth = require("../auth/auth.middleware");

router.route("/users").get(auth, getUsersList);
router.route("/user/:id").put(auth, updateUser);
router.route("^/users/:phoneNumber([0-9]+)").get(getUserListByPhoneNumber);

module.exports = router;
