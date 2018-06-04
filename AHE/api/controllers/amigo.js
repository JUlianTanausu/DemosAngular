'use strict'

var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

var Amigo = require('../models/Amigo');

var jwt = require('../services/jwt');





//prueba
function pruebas(req, res){
    res.status(200).send({
        message: 'Accion de pruebas en amigo'
    });

}


//saveAmigo
function saveAmigo(req, res){
    var amigo = new Amigo();

    var params = req.body;

    if(params.email){
        amigo.email = params.email;


        //validamos para comprobar k no exista ya
        Amigo.find({email: amigo.email.toLowerCase()}).exec((err, amigos) =>{
            if(err){
                return res.status(500).send({message: 'Error en la petición de usuarios'});
            }
            if(amigos && amigos.length >=1){
                return res.status(200).send({message: 'El amigo que intentas registrar ya existe'});
            }else{
                amigo.save((err, amigoStored) =>{
                    if(err){
                        return res.status(500).send({message: 'Error en el servidor'});
                    }else{
                        if(!amigoStored){
                            return res.status(404).send({message: 'No se ha guardado el amifo'});
                        }else{
                            return res.status(200).send({amigo: amigoStored});
                        }
                    }
                });
            }
        });

        
    }else{
        return res.status(200).send({message: 'El email es obligatorio'});
    }
}



module.exports = {
    pruebas,
    saveAmigo
}