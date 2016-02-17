'use strict'

var path = require('path');

var config = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 5000,

  // Server IP
  ip: process.env.IP || 'localhost',

  // seed DB
  seedDB: true,

  mongo: {
    uri: 'mongodb://localhost/sms',
    options: {
      db: {
        safe: true
      },
      server: {
        auto_reconnect: true,
        socketOptions: { keepAlive: 1},
        reconnectTries: 3,
        reconnectInterval: 1000
      }
    }
  },

  ssl: {
    use: process.env.SSL || true,
    key: 'server/setting/ssl/hihopper.pem',
    cert: 'server/setting/ssl/hihopper.crt'
  },

  log: {
    logDir: 'server/logs',
    filename:  'access',
    maxsize: 5242880, // 5MB
    maxFiles: 5
  }

};

module.exports = config;
