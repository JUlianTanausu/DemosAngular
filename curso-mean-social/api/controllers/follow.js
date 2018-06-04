'use strict'

//var path = require('path');
//var fs = require('fs');
var mongoosePaginate = require ('mongoose-pagination');


var User = require('../models/user');
var Follow = require('../models/follow');

function saveFollow(req, res){
    // recoger los parametos que nos llegan
    var params = req.body;

   var follow = new Follow();
   follow.user = req.user.sub;//guarda id
   follow.followed = params.followed;// el usuario seguido

   //guardo en la BDD
   follow.save((err, followStored) =>{
       if(err) return res.status(500).send({message: 'Error al guardar el seguimiento'});

       if(!followStored) return res.status(404).send({message: 'El seguimiento no se ha guardado'});

       return res.status(200).send({follow:followStored});
   });
}



function deleteFollow(req,res){
    //usuario logueado ahora mismo
    var userID = req.user.sub;

    //usuario que vamos a dejar de seguir, se pasa por la URL
    var followId = req.params.id;

    Follow.find({'user': userID, 'followed': followId}).remove(err =>{
        if(err) return res.status(500).send({message: 'Error al dejar de seguir'});

        return res.status(200).send({message: 'ya no sigues al usuario'});
    })

}



//listar usuarios que sigo, paginado
function getFollowingUsers(req, res){
    //usuario logueado ahora mismo
    var userId = req.user.sub;

    //si nos llega el ID y la pagina por URL, este va ser prioritario para el LIST

    if(req.params.id && req.params.page){
        userId = req.params.id;
    }

    var page = 1;//x defecto

    //si nos llega una pagina x URL
    if(req.params.page){
        page = req.params.page;
    }else{
        page = req.params.id;
    }

    var itemsPerPage = 4;


    var options = {
        sort: '_id',
        page: page,
        limits: itemsPerPage
    };
    Follow.paginate({}, options, (err, follows, total) => {
   
        if(err) return res.status(500).send({message: 'Error en el servidor'});

        if(!follows) return res.status(404).send({message: 'No estas siguiendo a ningun usuario'});

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total/itemsPerPage),
            follows
        })
    });




}





//listar los usuarios k nos siguen a nosotros  ........ MIRAR CUANDO ESTE EL FRONTEND
function getFollowedUsers(req, res){
     //usuario logueado ahora mismo
     var userId = req.user.sub;

     //si nos llega el ID y la pagina por URL, este va ser prioritario para el LIST
 
     if(req.params.id && req.params.page){
         userId = req.params.id;
     }
 
     var page = 1;//x defecto
 
     //si nos llega una pagina x URL
     if(req.params.page){
         page = req.params.page;
     }else{
         page = req.params.id;
     }
 
     var itemsPerPage = 4;
 
 
     var options = {
         sort: '_id',
         page: page,
         limits: itemsPerPage
     };


     Follow.paginate({}, options, (err, follows, total) => {
    
         if(err) return res.status(500).send({message: 'Error en el servidor'});
 
         if(!follows) return res.status(404).send({message: 'No estas siguiendo a ningun usuario'});
 
         return res.status(200).send({
             total: total,
             pages: Math.ceil(total/itemsPerPage),
             follows
         })
     });
 
 
}



//Listar usuarios SIN paginar, creo va ser mejor
function gettMyFollows(req, res){
    //usuario logueado ahora mismo
    var userId = req.user.sub;
    var followed = req.params.followed;

    //los k yo sigo
    var find = Follow.find({user: userId});

    //los k me estan siguiendo
    if(req.params.followed){
        find = Follow.find({followed: userId});
    }

    find.populate('user followed').exec((err, follows) => {
        if(err) return res.status(500).send({message: 'Error en el servidor'});
 
         if(!follows) return res.status(404).send({message: 'No estas siguiendo a ningun usuario'});
 
         return res.status(200).send({follows});
    });
}




module.exports = {
    saveFollow,
    deleteFollow,
    getFollowingUsers,
    getFollowedUsers,
    gettMyFollows
}