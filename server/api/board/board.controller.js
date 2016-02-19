'use strict'

var Board = require('./board.model');
var _ = require('lodash');

exports.index = function( req, res ) {

  var query = {};//{ userId: req.user.userId };

  var options = { select: '-_id no site title href writer dateStr hit',
                  page: parseInt(req.query.page) || 1,
                  limit: parseInt(req.query.limit) || 100,
                  sort: {}
                  };
  options.sort[(req.query.sort || 'no').toLowerCase()] = parseInt(req.query.order) || 1 ;

  Board.paginate( query, options,
                    function (err, result) {
                      if(err) { return errorHandler(500, res, err); }
                      if(!result.docs.length) { return errorHandler(404, res, 'Not Found'); }

                      global.logger.info( 'total:' + result.total + ' page:' + result.page + ' rows:' + result.docs.length);

                      return res.render('board', {rows: result.docs});

/*
                      return res.status(200).json({
                        total: result.total,
                        page: result.page,
                        rows: result.docs
                      });
*/
                    });
};


function errorHandler(status, res, err) {
  global.logger.warn(err);
  return res.render('404', {err: err});
}
