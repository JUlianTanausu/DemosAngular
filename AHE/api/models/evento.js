'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventoSchema = Schema({
    name: String,
    descripcion: String,
    image: String,
    date: String,
    lugar: String,
    hora: String,
    seccion: {type: Schema.ObjectId, ref: 'Seccion'}
});

module.exports = mongoose.model('Evento', EventoSchema);