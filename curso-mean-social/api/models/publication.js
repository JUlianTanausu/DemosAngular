'use strict'


var mongoosePaginate = require('mongoose-paginate');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = Schema({
    text: String,
    file: String,
    created_at: String, //fecha
    user: { type: Schema.ObjectId, ref: 'User' } //esquema user
});
PublicationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Publication', PublicationSchema);
//el guardara como publications