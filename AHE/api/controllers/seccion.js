'use strict'

var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

var Seccion = require('../models/seccion');
var User = require('../models/user');

var jwt = require('../services/jwt');


// PRUEBA
function pruebas(req, res){
    res.status(200).send({
        message: 'Accion de pruebas'
    });
}

// SAVE
function saveSeccion(req, res){
    var seccion = new Seccion();

    var params = req.body;

    if(params.name){
        seccion.name = params.name;

        seccion.save((err, seccionStored) =>{
            if(err){
                return res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!seccionStored){
                    return res.status(404).send({message: 'No se ha guardado la seccion'});
                }else{
                    return res.status(200).send({seccion: seccionStored});
                }
            }
        });
    }else{
        return res.status(200).send({message: 'El nombre de la seccion es obligatorio'});
    }
}


function getSecciones(req, res){
    Seccion.find({}).exec((err, secciones) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!secciones){
                res.status(404).send({message: 'No hay secciones'});
            }else{
                res.status(200).send({secciones});
            }

        }

    });
}


function getSeccion(req, res){
    var secName = req.params.name;


    Seccion.find({name: secName}).exec((err, seccion) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!seccion){
                res.status(404).send({message: 'No hay secciones'});
            }else{
                res.status(200).send({seccion});
            }

        }

    });

}

module.exports = {
    pruebas,
    saveSeccion,
    getSecciones,
    getSeccion
}