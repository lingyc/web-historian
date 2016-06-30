// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var download = require('../workers/htmlfetcher');

archive.readListOfUrls( list => {
  download.downloadUrls( list, null );
});