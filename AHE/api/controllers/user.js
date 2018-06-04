'use strict'

var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

var User = require('../models/user');
var Seccion = require('../models/seccion');

var jwt = require('../services/jwt');


// prueba
function pruebas(req, res){
    res.status(200).send({
        message: 'Accion de pruebas'
    });
}


//LOGIN
function loginUser(req, res){
    //recojo lo que se me envia
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email}, (err, user) => {

        //si devuelve error
        if(err) return res.status(500).send({message: 'Error en la  petición'});

        //si me devuleve 1 user
        if(user){
            //tengo k descifrar y comparar k la clave es correcta
            bcrypt.compare(password, user.password, (err, check) =>{
                if(check){
                    //si piden token
                    if(params.gettoken){
                        //generar y devolver token
                        return res.status(200).send({token: jwt.createToken(user)});
                    }else{
                        user.password = undefined;
                        return res.status(200).send({user});
                    }
                }else{
                    return res.status(400).send({message: 'El usuario no se ha podido identificar'});
                }
            });
        }else{
            return res.status(400).send({message: 'El usuario no se ha podido identificar'});
        }
    });
}



//save
function saveUser(req, res){
    var params = req.body;
    var user = new User();

    if(params.name && params.surname && params.nick && params.email && params.password && params.num){
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;
        user.num = params.num;

        var seccion = params.seccion
        
        Seccion.find({name: seccion}).exec((err, seccion) =>{
            if(err){
                return res.status(500).send({message: 'Error en la petición'});
            }else{
                if(!seccion){
                    return res.status(404).send({message: 'No se ha borrado el usuario'});
                }else{
                    //return res.status(404).send({seccion: seccion[0]._id});
                    user.seccion = seccion[0]._id;
                }
            }
        });

        // hay k valirdr mail o nick. k no exista ya en la BDD
        User.find({$or: [
                {email: user.email.toLowerCase()},
                {nick: user.nick}
            ]}).exec((err, users) => {
                if(err){
                    return res.status(500).send({message: 'Error en la petición de usuarios'});
                }

                if(users && users.length >=1){
                    return res.status(200).send({message: 'El usuario que intentas registrar ya existe'});
                }else{
                    //encripta y guarda pass
                    bcrypt.hash(params.password, null, null, (err, hash) =>{
                        user.password = hash;

                        //se guarda el user en la BDD
                        user.save((err, userStored) => {
                            if(err){
                                return res.status(500).send({message: 'Error en la petición'});
                            }
                            //si se ha guardado bien
                            if(userStored){
                                res.status(200).send({user: userStored});
                            }else{
                                res.status(404).send({message: 'No se ha registrado el usuario'});
                            }
                        });
                    });
                }
            });
    }else{
        res.status(200).send({message: 'Envia todos los campos necesarios'})
    }
}


//   .count() pa contar
//GET
function getUsers(req, res){
    User.find({}).populate({path: 'seccion'}).exec((err, users) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!users){
                res.status(404).send({message: 'No hay usuarios'});
            }else{
                res.status(200).send({users});
            }

        }

    });
}


// GET user x ID
function getUserId(req, res){
    var userId = req.params.id;

    User.find({_id: userId}).exec((err, user) => {
        if(err){
            return res.status(500).send({Message: 'Error en la peticion'});
        }else{
            if(!user){
                return res.status(404).send({message: 'no hay usuario'});
            }else{
                return res.status(200).send({user});
            }
        }
    });
}

//GEt de una seccion

function getUsersSeccion(req, res){

    var secid = req.params.id;

    User.find({seccion: secid}).populate({path: 'seccion'}).exec((err, users) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!users){
                res.status(404).send({message: 'No hay usuarios'});
            }else{
                res.status(200).send({users});
            }

        }

    });
}

//GET numero de socios x seccion
function getCountUsersSeccion(req, res){
    var secid = req.params.id;

    User.find({seccion: secid}).count().exec((err, count) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!count){
                res.status(404).send({message: 'No hay usuarios'});
            }else{
                res.status(200).send({count});
            }

        }

    });
}


//UPDATE
function updateUser(req, res){
    var userId = req.params.id;

    //datos k nosotors enviamos
    var update = req.body;

    delete update.password;

    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permisos para actualizar el usuario'});
    }

    //Cuando no se encuentra email o nick
    User.find({ $or: [
        {email: update.email.toLowerCase()},
        {nick: update.nick.toLowerCase()}
    ]}).exec((err, users) => {
        var user_isset = false;
        users.forEach((user)=>{
            if(user && user._id != userId){
                user_isset = true;
            }
        });

        if(user_isset){
            return res.status(404).send({message: 'Los datos ya estan en uso'});
        }

        User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) =>{
            if(err) return res.status(500).send({message: 'Error en la petición'});

            if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

            return res.status(200).send({user: userUpdated});
        });
    });
}

function deleteUser(req, res){
    var userId = req.params.id;

    User.findByIdAndRemove(userId, (err, userRemoved) =>{
        if(err){
            return res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!userRemoved){
                return res.status(404).send({message: 'No se ha borrado el usuario'});
            }else{
                return res.status(404).send({user: userRemoved});
            }
        }
    });
}


//en teoria esta me sobra YA
function idSeccion(req, res){
    var seccion = 'Tenerife';

    User.find({seccion: {name : seccion}}).exec((err, users) =>{
        if(err){
            return res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!getUsersSeccion){
                return res.status(404).send({message: 'No se ha borrado el usuario'});
            }else{
                return res.status(404).send({user: users});
            }
        }
    });
}


module.exports = {
    pruebas,
    loginUser,
    saveUser,
    getUsers,
    updateUser,
    deleteUser,
    idSeccion,
    getUsersSeccion,
    getCountUsersSeccion,
    getUserId
}