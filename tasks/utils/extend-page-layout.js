var transfob = require('transfob');

// add handlebars layouts syntax to use page layout template
module.exports = function() {
  return transfob( function( file, enc, next ) {
    var contents = file.contents.toString();
    // MAIN_START & END used in pageNav
    contents = '{{#extend "page"}}{{#content "main"}}MAIN_START' + contents +
      'MAIN_END{{/content}}{{/extend}}';
    file.contents = new Buffer( contents );
    next( null, file );
  });
};
