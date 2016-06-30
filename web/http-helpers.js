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

var readFile = ( asset, callback ) => {
  fs.readFile( asset, 'utf-8', ( error, content ) => {
    if ( error ) {
      throw error;
    } else {
      callback ( content );
    }
  });
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  readFile ( asset, callback );
};

// As you progress, keep thinking about what helper functions you can put here!
exports.serveArchivedPage = ( url, callback ) => {
  var isUrlInList = archive.isUrlInList;
  var addUrlToList = archive.addUrlToList;
  
  url = url.slice(1);
  // Check if we have the url in our list
  console.log ( 'url to check: ', url );
  if ( isUrlInList ( url ) ) {
    console.log('We have it!');
    // If it is archived, run callback with archivedPage
    // If it is not, run return nothing
    callback('Something');
  } else {
    console.log('We dont have it =(');
    // add it to List
    // Run callback with no args (Return nothing)
    addUrlToList(url);
    callback();
  }
    


};
