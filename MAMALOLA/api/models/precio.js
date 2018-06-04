'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PrecioSchema = Schema({
    precioTienda: Number,
    precioFinal: Number,
    tarifa: { type: Schema.ObjectId, ref: 'Tarifa' } 

});

module.exports = mongoose.model('Precio', PrecioSchema);