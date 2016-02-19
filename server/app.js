'use strict'

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var express = require('express');
var config = require('./setting/config');

global.logger = require('./components/logger');
global.logger.config(config.log);



require('./setting/mongodb.js')(config.mongo);


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
