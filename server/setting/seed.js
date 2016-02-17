'use strict'

var Samples = require('../api/samples/samples.model');


var express = require('express');

var router = express.Router();
router.get('/',  function( req, res ) {

  global.logger.info('--------------- seed DB ---------------');
  Samples.find({}).remove( function(){
    for(var i = 0; i < 300; ++i) {
      var num = pad(i, 3, '0')
      Samples.create( {key: 'KEY_' + num, value: 'VALUE_' + i});
    }
  });

  return res.status(200).json({
  });
});

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


module.exports = router;
