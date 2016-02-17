'use strict'

var cluster = require('cluster');
var config = require('./setting/config');
var logger = require('./components/logger');

logger.config(config.log);


function startWorker() {
  var worker = cluster.fork();
  logger.info('CLUSTER: worker %d started', worker.id);
}

if( cluster.isMaster ) {
/*
  require('os').cpus().forEach(function(){
    startWorker();
  });
*/
  startWorker();
  startWorker();

  cluster.on('disconnect', function(worker) {
    logger.info('CLUSTER: worker %d disconnected from the cluster', worker.id);
  });
  cluster.on('exit', function(worker, code, signal) {
    logger.info('CLUSTER: worker %d died with exit code %d (%s)', worker.id, code, signal);
    startWorker();
  });
}
else {
  require('./app')();
}
