var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var headers = httpHelpers.headers;



exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  console.log ('Making request type', req.method, 'at path:', req.url );
  
  if ( req.url === '/' ) {
    res.writeHead(200, headers);
    httpHelpers.serveAssets ( res, 'web/public/index.html', content => res.end (content) );
  } else if ( req.url === '/styles.css') {
    headers['Content-Type'] = 'text/css';
    res.writeHead(200, headers);
    httpHelpers.serveAssets ( res, 'web/public/styles.css', content => res.end (content) );
  } else if ( req.url.includes ( 'inputHandler' ) ) {
    headers['Content-Type'] = 'text/javascript';
    res.writeHead(200, headers);
    httpHelpers.serveAssets ( res, 'web/inputHandler.js', content => res.end (content) );
  } else {
    // ERROR
    console.log( 'error' );
  }
};
