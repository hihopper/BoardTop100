'use strict';

var fs = require('fs');
var winston = require('winston');
var moment = require('moment');
var DailyRoateFile = require('winston-daily-rotate-file');

var _log = {};



module.exports = {
  stream: {
    write: function(msg, encoding) {
      if( _log.constructor === winston.Logger ) { _log.info.apply(this, arguments); }
      else { console.log.apply(this, arguments); }
    }
  },

  error: function(msg) {
    if( _log.constructor === winston.Logger ) { _log.error.apply(this, arguments); }
    else { console.log.apply(this, arguments); }
  },

  warn: function(msg) {
    if( _log.constructor === winston.Logger ) { _log.warn.apply(this, arguments); }
    else { console.log.apply(this, arguments); }
  },

  info: function(msg) {
    if( _log.constructor === winston.Logger ) { _log.info.apply(this, arguments); }
    else { console.log.apply(this, arguments); }
  },

  debug: function(msg) {
    if( _log.constructor === winston.Logger ) { _log.debug.apply(this, arguments); }
    else { console.log.apply(this, arguments); }
  },


  config: function(cfg) {

    if(!cfg) {
      return;
    }

    _log = new winston.Logger({
      transports: []
    });

    if( cfg.hasOwnProperty('logDir') ) {
      if( !fs.existsSync(cfg.logDir)) {
        fs.mkdirSync(cfg.logDir);
      }
      _log = new winston.Logger({
        transports: [
          new DailyRoateFile({
            level: 'info',
            filename: cfg.logDir + '/' + cfg.filename,
            handleExceptions: true,
            json: false,
            maxsize: cfg.maxsize, //5242880, // 5MB
            maxFiles: cfg.maxFiles, //5,
            colorize: false,
            datePattern: '_yyyyMMdd.log',
            timestamp: function(){
              return moment().format("YYYY/MM/DD HH:mm:ss.SSS");
            }
          }),
          new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
          })
        ],
        exitOnError: false
      });
    }
    else {
      _log = new winston.Logger({
        transports: [
          new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
          })
        ],
        exitOnError: false
      });
    }
  }
}
