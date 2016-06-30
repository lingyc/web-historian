var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
var urlStorage;

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf-8', ( error, content ) => {
    if ( error ) {
      console.err(error);
    } else {
      urlStorage = ( content.split('\n') );
      callback(urlStorage);
    }
  });
};

exports.readListOfUrls(() => {} );

exports.isUrlInList = function( url, callback ) {
  callback(urlStorage.indexOf(url) !== -1);
};

exports.addUrlToList = function( url, callback ) {
  urlStorage.push ( url );

  fs.appendFile(exports.paths.list, `${url}\n`, ( error ) => {
    if ( error ) {
      throw error;
    } 
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  
  fs.access( exports.paths.archivedSites + '/' + url, fs.F_OK, err => callback(!err));
};

exports.downloadUrls = function( urls, callback ) {
  urls.forEach ( url => {
    exports.isUrlArchived ( url, exists => {
      var options = {
        hostname: url,
        method: 'GET',
        headers: {
          'Content-Type': 'text/html'
        }
      };

      var req = http.request( options, res => {
        var data = '';
        res.setEncoding('utf8');
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          // Make a file for that URL
          console.log(exports.paths.archivedSites);
          fs.writeFile( exports.paths.archivedSites + '/' + url, data, 'utf8', err => {
            if (err) {
              throw err;
            }
            console.log('File written');
          });
        });
      });

      req.on('error', err => console.error ( err ));

      req.end();
    });
  });
};

