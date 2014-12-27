'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

//router.get('/', controller.index);
router.post('/login', controller.login);
router.get('/leaders', controller.leaders);


module.exports = router;