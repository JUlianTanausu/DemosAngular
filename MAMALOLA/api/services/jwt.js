'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso_desarrollar_red_social_angular'; // clave secreta k solo sabremos nosotros como programadores del BACKEND
// nadie podria descifrar el token, sin saber esta clave





exports.createToken = function(user){
    //los datos que quiero que esten codificados dentro del token, que sera la info del usuario
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),               //la fecha de creacion del token
        exp: moment().add(30, 'days').unix  //fecha de inspiracion del token, 30 dias 
    };

    return jwt.encode(payload, secret);

};