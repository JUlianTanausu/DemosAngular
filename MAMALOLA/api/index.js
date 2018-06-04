/*
'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mamalola')
    .then(() => {
        console.log("La conexion a la base de datos mamalola se ha conectado correctamente")
    })
    .catch(err => console.log(err));


*/
'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mamalola')
    .then(() => {
        console.log("La conexion a la base de datos mamalola se ha conectado correctamente")

        //crear servidor
        app.listen(port, () =>{
            console.log("Servidor corriendo en http://localhost:3800");
        });
    })
    .catch(err => console.log(err));