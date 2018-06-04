'use strict'

var express = require('express');
var SeccionController = require('../controllers/seccion');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

var multipart = require('connect-multiparty');



api.get('/pruebas-seccion',md_auth.ensureAuth, SeccionController.pruebas);
api.post('/register-seccion',md_auth.ensureAuth, SeccionController.saveSeccion);
api.get('/secciones', SeccionController.getSecciones);
api.get('/nameSeccion/:name', SeccionController.getSeccion);


module.exports = api;