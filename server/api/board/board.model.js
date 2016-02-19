'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var boardSchema = mongoose.Schema({
  no: { type: Number,  index: { unique: true }, require: true },
  site: String,
  title: String,
  href: String,
  writer: String,
  regDate: Date,
  dateStr: String,
  hit: Number
});

boardSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('top100', boardSchema);
