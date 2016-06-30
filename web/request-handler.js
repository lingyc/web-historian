var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var headers = httpHelpers.headers;


var actions = {
  GET: (req, res) => {
    if ( req.url === '/' ) {
      res.writeHead(200, headers);
      httpHelpers.serveAssets ( res, 'web/public/index.html', content => res.end (content) );
    } else if ( req.url === '/styles.css') {
      headers['Content-Type'] = 'text/css';
      res.writeHead(200, headers);
      httpHelpers.serveAssets ( res, 'web/public/styles.css', content => res.end (content) );
    } else if ( req.url.includes ( 'www.' ) && req.url.includes ( '.com' ) ) {
      res.writeHead(200, headers);
      httpHelpers.serveAssets ( res, archive.paths.archivedSites + '/' + req.url, content => res.end (content) );
    } else {
      res.writeHead(404, headers);
      res.end();
    }
  },
  POST: (req, res) => {
    headers['Content-Type'] = 'text/plain';
    var data = '';

    req.on('data', chunk => data += chunk);

    req.on('error', err => console.log(err));

    req.on('end', () => {
      archive.addUrlToList ( data );
      res.writeHead(201, headers);
      res.end('success');
    });
  }
};

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  console.log ('Making request type', req.method, 'at path:', req.url );

  if ( actions[req.method] ) {
    actions[req.method](req, res);
  } else {
    console.log ('Error in handleRequest');
  }

};
