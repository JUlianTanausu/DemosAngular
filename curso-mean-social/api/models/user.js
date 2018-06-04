'use strict'


var mongoosePaginate = require('mongoose-paginate');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    nick: String,
    password: String,
    role: String,
    image: String
});
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
//el guardara como users