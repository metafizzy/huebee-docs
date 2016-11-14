var gulp = require('gulp');
var hbLayouts = require('handlebars-layouts');
var frontMatter = require('gulp-front-matter');
var path = require('path');
var handlebars = require('gulp-hb');
var rename = require('gulp-rename');
var transfob = require('transfob');
var highlight = require('./utils/highlight.js');
var pageNav = require('./utils/page-nav.js');
var extendPageLayout = require('./utils/extend-page-layout.js');

// handlebars helpers
var helpers = {
  lowercase: function( str ) {
    return str.toLowerCase();
  },
  plusOne: function( str ) {
    return parseInt( str, 10 ) + 1;
  },
  slug: function( str ) {
    return str.replace( /[^\w\d]+/gi, '-' ).toLowerCase();
  },
};

var contentSrc = 'content/*.hbs';
var dataSrc = 'data/*.json';
var layoutsSrc = 'layouts/*.hbs';
var partialsSrc = 'modules/**/*/*.hbs';

module.exports = function( data, watch ) {

  gulp.task( 'content', function() {
    gulp.src( contentSrc )
      .pipe( frontMatter({
        property: 'data.page',
        remove: true
      }) )
      // add basename
      .pipe( transfob( function( file, enc, next ) {
        file.basename = path.basename( file.path, '.hbs' );
        next( null, file );
      }))
      .pipe( extendPageLayout() )
      .pipe( handlebars()
        .data( data )
        .data( dataSrc )
        .partials( layoutsSrc )
        .partials( partialsSrc, {
          parsePartialName: getPartialBasename,
        })
        .partials( 'bower_components/fizzy-docs-modules/*/*.hbs', {
          parsePartialName: getPartialBasename,
        })
        .helpers( hbLayouts )
        .helpers( helpers )
      )
      .pipe( pageNav() )
      .pipe( highlight() )
      .pipe( rename({ extname: '.html' }))
      .pipe( gulp.dest('build') );
  });

  watch( [ contentSrc, dataSrc, layoutsSrc, partialsSrc ], [ 'content' ] );

};

function getPartialBasename( options, file ) {
  return path.basename( file.path, '.hbs' );
}
