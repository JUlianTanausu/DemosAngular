'use strict'

var express = require('express');
var UserController = require('../controllers/product');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});


module.exports.api;
