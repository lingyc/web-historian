var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};


exports.readFile = ( asset, callback ) => {
  fs.readFile( asset, 'utf-8', ( error, content ) => {
    if ( error ) {
      throw error;
    } else {
      callback ( content );
    }
  });
};

exports.collectData = ( request, callback ) => {
  var data = '';

  request.on('data', chunk => data += chunk);

  request.on('end', () => callback ( data ));
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  exports.readFile ( asset, callback );
};

// As you progress, keep thinking about what helper functions you can put here!
exports.serveArchivedPage = ( url, callback ) => {
  // var isUrlInList = archive.isUrlInList;
  // var addUrlToList = archive.addUrlToList;
  
  // url = url.slice(4);

  // addUrlToList(url);
  // callback('something');
    


};
