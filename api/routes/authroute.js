const express = require('express');
const router = express.Router();
const control = require('../controller/authcontrol');
const checkauth = require('../../config/checkauth');


router.post('/signup',control.signup);

router.post('/login',control.login);

router.delete("/delete/:userId",checkauth,control.delete)

module.exports = router;