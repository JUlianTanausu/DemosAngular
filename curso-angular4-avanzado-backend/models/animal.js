'use strict'

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var AnimalSchema = Schema({
    name: String,
    description: String,
    year: Number,
    image: String,
    user: {type: Schema.ObjectId, ref: 'User'}// id de la tabla user
});

module.exports = mongoose.model('Animal', AnimalSchema);// Mongoose lo pone en plural despues Users