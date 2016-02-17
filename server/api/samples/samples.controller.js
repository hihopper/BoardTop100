'use strict'

var Samples = require('./samples.model');
var _ = require('lodash');

exports.index = function( req, res ) {

  var query = {};//{ userId: req.user.userId };
  if( req.query.search && req.query.value ) {
    if( req.query.search.toLowerCase() === 'key' ||
        req.query.search.toLowerCase() === 'value' ) {
      query[req.query.search.toLowerCase()] = new RegExp('^'+req.query.value, "i");
      //  query = {value: /^VALUE_10/};
    }
  }

  var options = { select: '-_id key value',
                  page: parseInt(req.query.page) || 1,
                  limit: parseInt(req.query.limit) || 0,
                  sort: {}
                  };
  options.sort[(req.query.sort || 'key').toLowerCase()] = parseInt(req.query.order) || -1 ;

  Samples.paginate( query, options,
                    function (err, result) {
                      if(err) { return errorHandler(500, res, err); }
                      if(!result.docs.length) { return errorHandler(404, res, 'Not Found'); }

                      global.logger.info( 'total:' + result.total + ' page:' + result.page + ' rows:' + result.docs.length);

                      return res.status(200).json({
                        total: result.total,
                        page: result.page,
                        rows: result.docs
                      });
                    });
                    /*
                      var stop = new Date().getTime();
                        while(new Date().getTime() < stop + 1000) {
                            ;
                        }
                  */


/*
  Samples.find( function( err, rows ) {
    if( err || !rows ) {
      console.log( err );
      return res.status(500).send(err);

    }
    global.logger.info( 'rows.length:' + rows.length );

    return res.status(200).json({
      count:rows.length,
      rows:rows.map(function(row) {
        return {
          key: row.key,
          value: row.value
        }
      })
    });
  });
*/
};

exports.create = function(req, res) {
  global.logger.info('Create samples: ', req.body);

  Samples.create(req.body, function(err, row) {
    if(err) { return errorHandler(500, res, err); }
    return res.status(201).json(row);
  });
};

exports.update = function( req, res ) {
  if(req.body.key) { delete req.body.key; }

  global.logger.info('Update samples: ', req.body);

  Samples.findOne({ key: req.params.key }, function(err, row) {
    if(err) { return errorHandler(500, res, err); }
    if(!row) { return errorHandler(404, res, 'Not Found'); }

    var updated = _.merge(row, req.body);

    updated.save(function(err, row) {
      if(err) { return errorHandler(500, res, err); }
      return res.sendStatus(200);
    });

  });
};

exports.delete = function( req, res ) {
  global.logger.info('Delete samples: key=', req.params.key);

  Samples.findOne({ key: req.params.key }, function(err, row) {
    if(err) { return errorHandler(500, res, err); }
    if(!row) { return errorHandler(404, res, 'Not Found'); }

    row.remove( function(err) {
      if(err) { return errorHandler(500, res, err); }
      return res.sendStatus(204);
    });
  });
};

function errorHandler(status, res, err) {
  global.logger.warn(err);
  return res.sendStatus(status);
}
