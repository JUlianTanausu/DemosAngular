'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeccionSchema = Schema({
    name: String,
    

});
module.exports = mongoose.model('Seccion', SeccionSchema);