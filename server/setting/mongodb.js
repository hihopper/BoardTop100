'use strict'

var mongoose = require('mongoose');

module.exports = function(cfg) {

  mongoose.connect(cfg.uri, cfg.options);
  mongoose.connection.on('error', function(err) {
    global.logger.info('MongoDB connection error: ' + err);
    process.exit(-1);
  });

  mongoose.connection.on('connected', function () {
      global.logger.info('MongoDB connected!');
  });
  mongoose.connection.on('reconnected', function () {
      global.logger.info('MongoDB reconnected!');
  });
  mongoose.connection.on('disconnected', function () {
      global.logger.info('MongoDB disconnected!');
      process.exit(-1);
  });

};
