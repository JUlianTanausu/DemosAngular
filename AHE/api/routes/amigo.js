'use strict'

var express = require('express');
var AmigoController = require('../controllers/amigo');

var api = express.Router();
var multipart = require('connect-multiparty');





api.get('/pruebasAmigo', AmigoController.pruebas);
api.post('/registerAmigo', AmigoController.saveAmigo);




module.exports = api;