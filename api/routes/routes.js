const express = require('express');
const control = require('../controller/controller');
const checkauth = require('../../config/checkauth');

const router = express.Router();

router.post('/create',control.createRecord);
router.get('/getnumber',control.getNumber);
router.patch('/updates',control.updates);
router.get('/get_all',checkauth,control.get_Allinloc);
router.delete('/deleteone',checkauth,control.removeone);

module.exports = router;
