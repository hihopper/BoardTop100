'use strict'

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan')
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./config');
var handlebars = require('express-handlebars');

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

handlebars = handlebars.create({
  defaultLayout: 'main',
  layoutsDir: path.join(config.root, 'server/views/layouts'),
  helpers: {
    number: function(a) {
      return formatNumber(a.fn(this));
    }
  }}
);
//      partialsDir: path.join(__dirname, 'views/partials')



module.exports = function(app) {
  var env = app.get('env');

  app.set('views', path.join(config.root, 'server/views'));
  app.engine('handlebars', handlebars.engine);
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

  app.use(favicon(path.join(config.root, 'server/statics','favicon.png')));
  app.use(express.static(path.join(config.root, 'server/statics')));

  if( 'heroku' === env ) {
  }

  if ('production' === env) {
    app.use(require("morgan")("short", { "stream": global.logger.stream }));
  }

  if ('development' === env || 'test' === env) {
    app.use(require("morgan")("short", { "stream": global.logger.stream }));
  }

};
