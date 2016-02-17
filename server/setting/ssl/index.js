'use strict'

var path = require('path');
var fs = require('fs');
var config = require('../config');

var options = {
  key: fs.readFileSync(path.join(config.root, config.ssl.key)),
  cert: fs.readFileSync(path.join(config.root, config.ssl.cert))
};


module.exports = options;
