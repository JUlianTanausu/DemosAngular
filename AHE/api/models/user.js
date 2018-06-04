'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    nick: String,
    password: String,
    role: String,
    image: String,
    num: Number,
    seccion: {type: Schema.ObjectId, ref: 'Seccion'}
});

module.exports = mongoose.model('User', UserSchema);
