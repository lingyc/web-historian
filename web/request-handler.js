var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');



exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  httpHelpers.serveAssets ( res, 'web/public/index.html', content => res.end (content) );
};
