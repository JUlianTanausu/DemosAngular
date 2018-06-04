'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TarifaSchema = Schema({
    nombre: String,
    porcentaje: Number

});

module.exports = mongoose.model('Tarifa', TarifaSchema);