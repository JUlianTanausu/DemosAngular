'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require ('mongoose-pagination');

var Publication = require('../models/publication');
var User = require('../models/user');
var Follow = require('../models/follow');


function probando(req, res){
    res.status(200).send({
        message: "Hola desde el controlador de publicaciones"
    });
}



function savePublication(req, res){
    //se recoge de formulario
    var params = req.body;
    var publication = new Publication();

    //si no llega la propiedad texto
    if(!params.text){
        return res.status(200).send({message: 'Debes enviar un texto!!'});
    }

    //se asiganan todos los campos k tiene publicaciones en su base de datos, menos la de fichero
    var publication = new Publication();
    publication.text = params.text;
    publication.file = 'null';
    publication.user = req.user.sub;
    publication.created_at = moment().unix();

    publication.save((err, publicationStored) => {
        if(err) return res.status(500).send({message: 'Error al guardar la publicacion'});

        if(!publicationStored) return res.status(404).send({message: 'La publicacion no ha sido guardada'});

        return res.status(200).send({publication: publicationStored});
    });

}



//todas las publicaciones de los usuarios k estoy siguiendo
function getPublications(req, res){
    var page = 1;
    //la pgian se recoge de URL
    if(req.params.page){
        page = req.params.page;
    }

    var itemsPerPage = 4;

    //id usuario logueado
    Follow.find({user: req.user.sub}).populate('followed').exec((err, follows) =>{
        if(err) return res.status(500).send({message: 'Error al devolver el seguimiento'});

        var follows_clean = [];

        follows.forEach((follow) => {
            follows_clean.push(follow.followed);
        });

        var options = {
            sort: '-created_at', // de mas nuevo a mas viejo ordena
            page: page,
            limits: itemsPerPage
        };
        //sort con el created, se ordena de mas nueva a mas vieja
        Publication.paginate({}, options, (err, publications, total) => {
        
            if(err) return res.status(500).send({message: 'Error al devolver publicaciones'});

            if(!publications) return res.status(404).send({message: 'No hay publicaciones'});

            return res.status(200).send({
                total_items: total,
                pages: Math.ceil(total/itemsPerPage),
                page: page,
                publications
            })
        });
    });
}



//devolver una publicacion
function getPublication(req, res){
    var publicationId = req.params.id;

    Publication.findById(publicationId, (err, publication) => {
        if(err) return res.status(500).send({message: 'Error al devolver publicaciones'});

        if(!publication) return res.status(500).send({message: 'No exisate la publicacion'});

        res.status(200).send({publication});
    })
}



function deletePublication(req, res){
    var publicationId = req.params.id;

    Publication.find({user: req.user.sub, '_id': publicationId}).remove((err, publicationRemoved) => {
        if(err) return res.status(500).send({message: 'Error al borrar publicaciones'});

        if(!publicationRemoved) return res.status(500).send({message: 'No se ha borrado la publicacion'});

        res.status(200).send({message : 'Publicacion eliminada correctamente'});
    });
}





function uploadImage(req, res){
    var publicationId = req.params.id

   

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

            Publication.findOne({'user':req.user.sub, '_id':publicationId}).exec((err, publication) =>{
                if(publication){
                     //Actualizar documento de publicacion
                    Publication.findByIdAndUpdate(publicationId, {file: file_name}, {new: true}, (err, publicationUpdated) =>{
                        if(err) return res.status(500).send({message: 'Error en la peticion'});

                        if(!publicationUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

                        return res.status(200).send({publication: publicationUpdated});
                    });
                }else{
                    return removeFilesOfUploads(res, file_path, 'No tienes permisos para actuañizar esta publicacion');
                }
            });


           

        }else{
            //si no tiene una de las extensiones correctas eliminamos el archivo
           return removeFilesOfUploads(res, file_path, 'Extension no valida');
        }


    }else{
        return res.status(200).send({message: 'No se han subido imagenes'});
    }


}


function removeFilesOfUploads(res, file_path, message){
    fs.unlink('file_path',(err) => {
        if(err) return res.status(200).send({message: message});
    });
}



//Devolver imagenes de usuario
function getImageFile(req, res){
    var image_file = req.params.imageFile;

    var path_file = './uploads/publications/'+image_file;

    fs.exists(path_file, (exists) =>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen...'});
        }
    });
}

module.exports = {
    probando,
    savePublication,
    getPublications,
    getPublication,
    deletePublication,
    uploadImage,
    getImageFile
}