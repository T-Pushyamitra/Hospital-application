const express = require('express');

const router = express.Router();

const { login, logout, register } = require('./auth.service');

router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/register').post(register);

module.exports = router;
