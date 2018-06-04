'use strict'

var express = require('express');
var EventoController = require('../controllers/evento');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/eventos'});
var md_admin = require('../middlewares/is_admin');

api.get('/pruebaEvento', EventoController.pruebas);
api.post('/saveEvento', [md_auth.ensureAuth, md_admin.isAdmin],EventoController.saveEvento);
api.get('/eventoSeccion/:id', EventoController.getEventosSeccion);
api.delete('/delete-evento/:id',[md_auth.ensureAuth, md_admin.isAdmin], EventoController.deleteEvento);
api.put('/updateEvento/:id', [md_auth.ensureAuth, md_admin.isAdmin], EventoController.updateEvento);
api.post('/uploadImageEvento/:id', [md_auth.ensureAuth, md_upload], EventoController.uploadImage);
api.get('/get-image-evento/:imageFile', EventoController.getImageFile);

module.exports = api;