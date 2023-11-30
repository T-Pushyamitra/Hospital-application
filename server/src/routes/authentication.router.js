const express = require("express")
const router = express.Router()

const { login } = require("../authentication/login");
const { register } = require("../authentication/register");

router.route("/auth/login").post(login);
router.route("/auth/register").put(register);

module.exports = router;