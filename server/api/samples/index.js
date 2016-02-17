'use strict'

var express = require('express');
var controller = require('./samples.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:key', controller.update);
router.delete('/:key', controller.delete);

module.exports = router;
