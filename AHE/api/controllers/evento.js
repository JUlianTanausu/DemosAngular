'use strict'

var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

var Evento = require('../models/evento');
var Seccion = require('../models/seccion'); 
var jwt = require('../services/jwt');


// PRUEBA
function pruebas(req, res){
    res.status(200).send({
        message: 'Accion de pruebas'
    });
}

// SAVE
function saveEvento(req, res){
    var params = req.body;
    var evento = new Evento();

    if(params.name  ){
        evento.name = params.name;
        evento.descripcion = params.descripcion;
        evento.date = params.date;
        evento.lugar = params.lugar;
        evento.hora = params.hora;
        evento.image = null;
        

        var seccion = params.seccion
        
        Seccion.find({name: seccion}).exec((err, seccion) =>{
            if(err){
                return res.status(500).send({message: 'Error en la petición'});
            }else{
                if(!seccion){
                    return res.status(404).send({message: 'No se ha borrado el evento'});
                }else{
                    //return res.status(404).send({seccion: seccion[0]._id});
                    evento.seccion = seccion[0]._id;
                }
            }
        });

        // hay k valirdr mail o nick. k no exista ya en la BDD
        Evento.find({name: evento.name}).exec((err, events) => {
                if(err){
                    return res.status(500).send({message: 'Error en la petición de usuarios'});
                }

                if(events && events.length >=1){
                    return res.status(200).send({message: 'El usuario que intentas registrar ya existe'});
                }else{
                   

                        //se guarda el user en la BDD
                        evento.save((err, eventoStored) => {
                            if(err){
                                return res.status(500).send({message: 'Error en la petición'});
                            }
                            //si se ha guardado bien
                            if(eventoStored){
                                res.status(200).send({user: eventoStored});
                            }else{
                                res.status(404).send({message: 'No se ha registrado el usuario'});
                            }
                        });
                    
                }
            });
    }else{
        res.status(200).send({message: 'Envia todos los campos necesarios'})
    }
}


// GET 
function getEventosSeccion(req, res){
    var secid = req.params.id;

    Evento.find({seccion: secid}).populate({path: 'seccion'}).exec((err, events) =>{
        if(err){
            return res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!events){
                return res.status(404).send({message: 'No hay eventos'});
            }else{
                return res.status(200).send({events});
            }
        }
    });
}


//DELETE
function deleteEvento(req, res){
    var eventoId = req.params.id;

    Evento.findByIdAndRemove(eventoId, (err, eventoRemoved) =>{
        if(err){
            return res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!eventoRemoved){
                return res.status(404).send({message: 'No se ha borrado el evento'});
            }else{
                return res.status(404).send({user: eventoRemoved});
            }
        }
    });
}


//UPDATE
function updateEvento(req, res){
    var eventoId = req.params.id;

    var update = req.body;

    

    Evento.findByIdAndUpdate(eventoId, update, {new:true}, (err, eventoUpdated) =>{
        if(err) return res.status(500).send({message: 'Error en la petición'});

        if(!eventoUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

        return res.status(200).send({evento: eventoUpdated});
    });
}

//SUBIR IMAGEN
function uploadImage(req, res){
    var eventoId = req.params.id

   

    // si existe algun fichero enviado
    if(req.files){
        var file_path = req.files.image.path;
        console.log(file_path);
        var file_split = file_path.split('\\');
        var file_split = file_path.split('\/');
        console.log(file_split);//[ 'uploads', 'users', 'PLvSE-n1RFgEsQRaTVvOubrA.png' ]

        var file_name=file_split[2];
        //para cortar la extension
        var ext_split=file_name.split('\.');

        //[ PLvSE-n1RFgEsQRaTVvOubrA', 'png' ]
        var file_ext = ext_split[1];//extension


 

        //COmprobar klas extensiones son correctas
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
            //Actualizar documento de usuario logueado
            Evento.findByIdAndUpdate(eventoId, {image: file_name}, {new: true}, (err, eventoUpdated) =>{
                if(err) return res.status(500).send({message: 'Error en la peticion'});

                if(!eventoUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

                return res.status(200).send({event: eventoUpdated});
            })

        }else{
            //si no tiene una de las extensiones correctas eliminamos el archivo
           return removeFilesOfUploads(res, file_path, 'Extension no valida');
        }


    }else{
        return res.status(200).send({message: 'No se han subido imagenes'});
    }


}

//BORRAR IMAGEN
function removeFilesOfUploads(res, file_path, message){
    fs.unlink('file_path',(err) => {
        if(err) return res.status(200).send({message: message});
    });
}


//GET IMAGEN
function getImageFile (req, res){
    var image_file = req.params.imageFile;
    

    var path_file = './uploads/eventos/'+image_file;
    

    fs.exists(path_file, (exists) =>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen...'});
        }
    });
}

module.exports = {
    pruebas,
    saveEvento,
    getEventosSeccion,
    deleteEvento,
    updateEvento,
    uploadImage,
    getImageFile
}