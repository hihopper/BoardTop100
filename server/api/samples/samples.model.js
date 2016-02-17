'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var samplesSchema = mongoose.Schema({
  key: { type: String,  index: { unique: true }, require: true },
  value: String
});





samplesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Samples', samplesSchema);
