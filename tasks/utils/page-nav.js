var transfob = require('transfob');

var reMain = /MAIN_START([\w\W]+)MAIN_END/i;
var reHeader = /<h([23])>([\w\d\s\-_="'&;]+)<\/h[23]>/gi;

module.exports = function() {

  return transfob( function( file, enc, next ) {
    var contents = file.contents.toString();
    var pageNavHtml = '<ul class="page-nav">\n';
    contents = contents.replace( reMain, function( match, main ) {
      main = main.replace( reHeader, function( match2, hNumber, title ) {
        var slug = title.toLowerCase().replace( /[^\w\d]+/gi, '-' )
          // trim trailing hyphens
          .replace( /^\-+/, '' ).replace( /\-+$/, '' );
        if ( hNumber == '2' ) {
          pageNavHtml += '<li class="page-nav__item">' +
            '<a href="#' + slug + '">' + title + '</a></li>\n';
        }
        return '<h' + hNumber + ' id="' + slug + '">' + title +
          '</h' + hNumber + '>';
      });
      return main;
    });
    pageNavHtml += '</ul>';

    contents = contents.replace( '<ul class="page-nav"></ul>', pageNavHtml );
    file.contents = new Buffer( contents );
    next( null, file );
  });
};
