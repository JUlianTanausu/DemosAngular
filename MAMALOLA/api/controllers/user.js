'use strict'

var bcrypt = require('bcrypt-nodejs'); // para cifrar la contraseña
var mongoosePaginate = require ('mongoose-pagination');
var fs = require('fs'); // para trabajar con archivos
var path = require('path');


var User = require('../models/user');
var jwt= require('../services/jwt'); //servicio k genera el token



function pruebas(req, res){
    res.status(200).send({
        message: 'Accion de pruebas'
    });
}


function saveUser(req, res){
    var params = req.body; //todo lo k nos llega x post lo guardamos
    var user = new User();

        // si tenemos todos estos datos
    if(params.name && params.surname && params.nick && params.email && params.password){
        //se gurda cada dato en el corrrespondiente del usuario nuevo
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        //validamos email, no pueden aver email duplicados al registrarse
                // si el email o el nick ya existe en nuestra BDD
        User.find({$or: [
                            {email: user.email.toLowerCase()},
                            {nick: user.nick}
                        ]}).exec((err, users) => {
                            if(err){
                                return res.status(500).send({message: 'Error en la peticion de usuarios'});
                            }

                            if(users && users.length >=1){
                                return res.status(200).send({message: 'El usuario que intentas registrar ya existe'});
                            }else{
                                
                                //se encripta y se guarda las PASS
                                bcrypt.hash(params.password, null, null, (err, hash) =>{
                                    user.password = hash;

                                    //se guarda el user en la BDD
                                    user.save((err, userStored) =>{
                                        if(err){
                                            return res.status(500).send({message: 'Error al guardar el usuario'});
                                        }
                                        //si se ha guardado bien
                                        if(userStored){
                                            res.status(200).send({user: userStored})
                                        }else{
                                            res.status(404).send({message: 'No se ha registrado el usuario'});
                                        }
                                    });
                                });
                            }
                        });
         //--------------               


    }else{
        res.status(200).send({
            message: 'Envia todos los campos necesarios!!'
        })
    }
}



function loginUser(req, res){
    //recogemos los parametros k nos llegan x POST
    var params = req.body;

    var email = params.email;
    var password = params.password;

    //vemos si el email coincide con los de algun
    // usuario de nuestra BDD  (email == email )
    User.findOne({email: email}, (err, user) =>{
        if(err){
            return res.status(500).send({message: 'Error en la peticion'})
        }

        //si esl usuario con ese email exixte, ahora comprobamos la pass
        if(user){
            bcrypt.compare(password, user.password, (err, check) =>{
                if(check){
                    
                    if(params.gettoken){
                        //el token: el token recoge tosdos los datos del usuario a devolver, pero incriptados
                        // Se hace x tener mas seguridad -> esto es un servicio (jwt.js)
                        return res.status(200).send({
                            token: jwt.createToken(user)

                        });

                    }else{
                        //debemos eliminar de USER la PASS, que no la devuelva, xk entonces se puede ver
                        user.password = undefined;
                        //como es correto, devuelvo todos los datos del usuario
                        return res.status(200).send({user})
                    }

                    
                }else{
                    return res.status(404).send({message: 'El usuario no se ha podido identificar'});
                }
            });
        }else{
            return res.status(404).send({message: 'El usuario no se ha podido identificar!!'});
        }
    });
}



function getUsers(req, res){
    User.find({}).exec((err, users)=>{
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

// Edicion de datos de usuario
function updateUser(req, res){
    var userId = req.params.id; // los datos del usuario

    // los datos que nosotros enviamos desde form o lo que sea, para k actualice datos
    var update = req.body;

    // borrar propiedad password x seguridad
    delete update.password;

    //para saber si el usuario k recibo de la URL es diferente al logueado
    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permisos para actualizar el usuario '});
    }

    //cuando el email o el nick sean encontrados
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
        

        //new: true, al acabar de mandar la nueva informacion del usuario, 
    //ya devuelve este mismo actualizado y no sin los cambios
    User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

        return res.status(200).send({user: userUpdated});
    });
    });




    


}


//Subir archivos de imagen/avatar de usuario
function uploadImage(req, res){
    var userId = req.params.id

   

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


          //para saber si el usuario k recibo de la URL es diferente al logueado
        if(userId != req.user.sub){
            return removeFilesOfUploads(res, file_path, 'No tienes permisos para actualizar el usuario ');
            
        }

        //COmprobar klas extensiones son correctas
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
            //Actualizar documento de usuario logueado
            User.findByIdAndUpdate(userId, {image: file_name}, {new: true}, (err, userUpdated) =>{
                if(err) return res.status(500).send({message: 'Error en la peticion'});

                if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

                return res.status(200).send({user: userUpdated});
            })

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

    var path_file = './uploads/users/'+image_file;

    fs.exists(path_file, (exists) =>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen...'});
        }
    });
}





function deleteUser(req, res){
    var userId = req.params.id;

    User.findByIdAndRemove(userId, (err, userRemoved) => {
        if(err){
            return  res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!userRemoved){
                return  res.status(404).send({message: 'No se ha borrado el animal'});
            }else{
                return res.status(404).send({user: userRemoved});
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
    uploadImage,
    getImageFile,
    deleteUser
 

}