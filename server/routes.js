'use strict';

//var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
//  app.use('/api/things', require('./api/thing'));
  app.use('/api/board', require('./api/board'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components)/*')
//  .get(errors[404]);
    .get(function(req,res) {
        res.status(404);
        res.render('404');
      }
    );

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.redirect('api/board');
//      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

  app.use( function( err, req, res, next) {
    console.error('500 Error');
    console.error(err.stack);

    res.status(500);
    res.send('500 - server error');
  }); // Error handler - has to be last
};
