'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ahe')
    .then(() => {
        console.log("La conexion a la base de datos AHE se ha conectado correctamente")

        //crear servidor
        app.listen(port, () =>{
            console.log("Servidor corriendo en http://localhost:3800");
        });
    })
    .catch(err => console.log(err));