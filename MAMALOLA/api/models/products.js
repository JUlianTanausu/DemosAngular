'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    name: String,
    family: String,
    subFamily: String,
    proveedor: String,
    image: String,
    descripcion: String,
    cantidad: Number,
    precio: { type: Schema.ObjectId, ref: 'Precio' } //esquema user
});


module.exporrs = mongoose.model('Product', ProductSchema);