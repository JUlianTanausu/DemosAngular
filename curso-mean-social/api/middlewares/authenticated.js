/*
para validar el token.
Si al loguearse el token es valido se dejara pasar el usuario,
si no lo es, no tendrá acceso

*/


'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso_desarrollar_red_social_angular';

/*
req -> los datos que recibimos
res -> la respuesta k nos da este metodo
next -> nos permite saltar a otra funcionalidad cuando acabe esta comprobacion
*/
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticacion'});
    }

    //quitamos las comillas dobles y simples que pueda contener el token
    var token = req.headers.authorization.replace(/['"]+/g, '')

    try{
        //se descodifica el token con la clave
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'El token ha expirado'
            });
        }
    }catch(ex){
        return res.status(404).send({
            message: 'El token no es valido'
        });
    }

    req.user = payload;

    next();
    

}