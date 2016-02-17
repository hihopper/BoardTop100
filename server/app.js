'use strict'

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var express = require('express');
var mongoose = require('mongoose');

var config = require('./setting/config');
global.logger = require('./components/logger');

global.logger.config(config.log);

mongoose.connect(config.mongo.uri, config.mongo.options);
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


if(config.seedDB) {
//  require('./setting/seed');
}


var app = express();

if(config.seedDB) {
    app.use('/api/seedDB', require('./setting/seed'));
}

var server = config.ssl.use ? server = require('https').createServer(require('./setting/ssl'), app)
                            : server = require('http').createServer(app);

require('./setting/express.js')(app);
require('./routes.js')(app);

function startServer() {
  server.listen(config.port, function() {
      console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

if( require.main === module ) {
  startServer();
}
else {
  module.exports = startServer;
}
