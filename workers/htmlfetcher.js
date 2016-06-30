// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('http');

archive.readListOfUrls ( urls => {
// Iterate over the list of URLs
  urls.forEach ( url => {
  // Check if it's archived  
    // Make a file for that URL
    fs.open( archive.archivedSites, 'wx', err => {
      // Write URLs html to that file
      if ( err ) {
        console.err ( err );
      } else {
        var options = {
          hostname: url,
          method: 'GET',
          headers: {
            'Content-Type': 'text/html'
          }
        };

        var req = http.requestresponse( options, res => {
          var data = '';
          res.setEncoding('utf8');
          res.on('data', chunk => data += chunk);
          res.on('end', () => {});
        });

        req.on('error', err => console.error ( err ));

        req.end();

      }
    });
    if ( !archives.isUrlArchived ( url ) ) {
      // If it is not:


    }
    // If it is:

      // Skip it
  });
});