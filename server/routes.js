/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/types', require('./api/type'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/modes', require('./api/mode'));
  app.use('/api/statuses', require('./api/status'));
  app.use('/api/clients', require('./api/client'));
  app.use('/api/areas', require('./api/area'));
  app.use('/api/issues', require('./api/issue'));
  app.use('/api/things', require('./api/thing'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
