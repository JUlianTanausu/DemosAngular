'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AmigoSchema = Schema({
    email: String
});

module.exports = mongoose.model('Amigo', AmigoSchema);