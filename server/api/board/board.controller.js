'use strict'

var _ = require('lodash');
var handlers = require('express-handlebars');

var Board = require('./board.model');

function siteInfo (obj) {
  if( obj.site === 'ou' ) {         obj.info = {color: 'style="color:#fff; background-color: rgb(77,108,119);"', name: '오유'}; }
  else if( obj.site === 'beti') {   obj.info = {color: 'style="color:#fff; background-color: rgb(187,202,231);"', name: '베티'}; }
  else if( obj.site === 'mlbpark'){ obj.info = {color: 'style="color:#fff; background-color: rgb(254,94,0);"', name: '엠팍'}; }
  else if( obj.site === 'ppomppu'){ obj.info = {color: 'style="color:#fff; background-color: rgb(165,165,165);"', name: '뽐뿌'}; }
  else if( obj.site === 'ddanzi') { obj.info = {color: 'style="color:#fff; background-color: rgb(222,205,175);"', name: '딴지'}; }
  else if( obj.site === 'bobae') {  obj.info = {color: 'style="color:#fff; background-color: rgb(35,39,52);"', name: '보베'}; }
  else if( obj.site === 'clien') {  obj.info = {color: 'style="color:#fff; background-color: rgb(61,72,129);"', name: '클량'}; }
  else if( obj.site === '82cook') { obj.info = {color: 'style="color:#fff; background-color: rgb(69,159,57);"', name: '82쿡'}; }
  else if( obj.site === 'humor') {  obj.info = {color: 'style="color:#fff; background-color: rgb(237,23,70);"', name: '웃대'}; }
  else if( obj.site === 'ruli') {  obj.info = {color: 'style="color:#fff; background-color: rgb(8,97,182);"', name: '루리'}; }
  else if( obj.site === 'slr') {  obj.info = {color: 'style="color:#fff; background-color: rgb(67,142,221);"', name: 'SLR'}; }

  return obj;

}

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

                      result.docs = result.docs.map(siteInfo);

                      return res.render('board', {  rows: result.docs });


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
