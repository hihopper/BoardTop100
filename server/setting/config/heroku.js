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
    uri: 'mongodb://hopper:aaaa1111@ds047325.mongolab.com:47325/heroku_l85p17kb',
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
    use: false,
    key: 'server/setting/ssl/hihopper.pem',
    cert: 'server/setting/ssl/hihopper.crt'
  }
};

module.exports = config;
