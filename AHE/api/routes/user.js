'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');// importamos auntenticacion
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'})
var md_admin = require('../middlewares/is_admin');




api.get('/pruebas', UserController.pruebas);
api.post('/login', UserController.loginUser);
api.post('/register', UserController.saveUser);
api.get('/users', UserController.getUsers);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.delete('/delete-user/:id',[md_auth.ensureAuth, md_admin.isAdmin], UserController.deleteUser);
api.get('/seccionId', md_auth.ensureAuth, UserController.idSeccion);
api.get('/userSeccion/:id', md_auth.ensureAuth, UserController.getUsersSeccion);
api.get('/countUserSeccion/:id',  UserController.getCountUsersSeccion);
api.get('/userId/:id', md_auth.ensureAuth, UserController.getUserId);

module.exports = api;