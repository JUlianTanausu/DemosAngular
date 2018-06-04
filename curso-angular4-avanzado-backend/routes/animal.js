'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();
var md_auth = require('../middleware/authenticated');
var md_admin = require('../middleware/is_admin');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/animals' });

api.get('/pruebas-animales',md_auth.ensureAuth, AnimalController.pruebas);//protegida con token autenticacion
api.post('/animal',[md_auth.ensureAuth, md_admin.isAdmin], AnimalController.saveAnimal);
api.get('/animals', AnimalController.getAnimals);
api.get('/animal/:id', AnimalController.getAnimal);
api.put('/animal/:id', [md_auth.ensureAuth, md_admin.isAdmin],AnimalController.updateAnimal);
api.post('/upload-image-animal/:id',[md_auth.ensureAuth, md_admin.isAdmin, md_upload], AnimalController.uploadImage);
api.get('/get-image-animal/:imageFile', AnimalController.getImageFile);
api.delete('/animal/:id',[md_auth.ensureAuth, md_admin.isAdmin], AnimalController.deleteAnimal);

module.exports = api;