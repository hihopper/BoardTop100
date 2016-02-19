'use strict'

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan')
var bodyParser = require('body-parser');
var path = require('path');
var handlebars = require('express-handlebars');

var config = require('./config');

module.exports = function(app) {
  var env = app.get('env');


  app.set('views', path.join(config.root, 'server/views'));
  app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(config.root, 'server/views/layouts')
//      partialsDir: path.join(__dirname, 'views/partials')
  }));

  app.set('view engine', 'handlebars');
//  app.engine('html', require('ejs').renderFile);
//  app.set('view engine', 'html');
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

  if ('production' === env) {
    app.use(require("morgan")("short", { "stream": global.logger.stream }));
  }

  if ('development' === env || 'test' === env) {
    app.use(require("morgan")("short", { "stream": global.logger.stream }));
  }

};
