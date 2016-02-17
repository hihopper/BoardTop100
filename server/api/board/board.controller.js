'use strict'

var Samples = require('./board.model');
var _ = require('lodash');

exports.index = function( req, res ) {

  var query = {};//{ userId: req.user.userId };
/*
  if( req.query.search && req.query.value ) {
    if( req.query.search.toLowerCase() === 'key' ||
        req.query.search.toLowerCase() === 'value' ) {
      query[req.query.search.toLowerCase()] = new RegExp('^'+req.query.value, "i");
      //  query = {value: /^VALUE_10/};
    }
  }
*/
  var options = { select: '-_id no href text',
                  page: parseInt(req.query.page) || 1,
                  limit: parseInt(req.query.limit) || 0,
                  sort: {}
                  };
  options.sort[(req.query.sort || 'no').toLowerCase()] = parseInt(req.query.order) || -1 ;

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
};


function errorHandler(status, res, err) {
  global.logger.warn(err);
  return res.sendStatus(status);
}
