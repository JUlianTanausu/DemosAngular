'use strict'

var mongoosePaginate = require('mongoose-paginate');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User' }, //esquema user
    followed: { type: Schema.ObjectId, ref: 'User' } //esquema user
});

FollowSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Follow', FollowSchema);
//el guardara como follows