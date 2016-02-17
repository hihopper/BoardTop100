'use strict'

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan')
var bodyParser = require('body-parser');
var path = require('path');

//var logger = require('../components/logger');
var config = require('./config');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', path.join(config.root, 'server/views'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use(bodyParser.json());
  /*
  app.use(function(req, res, next) {
    var cluster = require('cluster');
    if( cluster.isWorker ) {
      global.logger.info('Worker %d is working...', cluster.worker.id);
    }
    next();
  });
*/
  if ('heroku' === env) {
    app.use(favicon(path.join(config.root, 'public','favicon.png')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', path.join(config.root, 'public'));
  }

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public','favicon.png')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', path.join(config.root, 'public'));
    app.use(require("morgan")("short", { "stream": global.logger.stream }));
  }

  if ('development' === env || 'test' === env) {
    app.use(favicon(path.join(config.root, 'client','favicon.png')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'client'));
    app.use(require("morgan")("short", { "stream": global.logger.stream }));
  }

};
