/* jshint node: true, unused: true, undef: true */

var glob = require('glob');
var gulp = require('gulp');
var handlebars = require('gulp-hb');
var rename = require('gulp-rename');
var path = require('path');

// -------------------------- setup -------------------------- //

function getGlobPaths( src ) {
  var paths = [];
  // expand paths
  src.forEach( function( path ) {
    if ( glob.hasMagic( path ) ) {
      var files = glob.sync( path );
      paths = paths.concat( files );
    } else {
      paths.push( path );
    }
  });

  return paths;
}

var data = {
  paletteColors: [
    '#D28',
    '#F00',
    '#F80',
    '#08F',
    '#555',
    '#FFF',
  ]
};

// -------------------------- css -------------------------- //

var cssSrc = [
  'bower_components/*/*.css',
  'bower_components/fizzy-docs-modules/*/*.css',
  'modules/**/*/*.css',
];

data.cssPaths = getGlobPaths( cssSrc );

// -------------------------- js -------------------------- //

var jsSrc = [
  // components
  'bower_components/ev-emitter/ev-emitter.js',
  'bower_components/unipointer/unipointer.js',
  'bower_components/huebee/huebee.js',
  // boilerplate
  'js/boilerplate.js',
  // docs
  'modules/**/*/*.js',
  // init
  'js/init.js',
];

data.jsPaths = getGlobPaths( jsSrc );

// -------------------------- content -------------------------- //

var hbLayouts = require('handlebars-layouts');
var highlight = require('./tasks/utils/highlight.js');

gulp.task( 'content', function() {
  gulp.src('content/*.hbs')
    .pipe( extendPageLayout() )
    .pipe( handlebars()
      .data( data )
      .partials( 'layouts/*.hbs')
      .partials( 'modules/**/*/*.hbs', {
        parsePartialName: getPartialBasename,
      })
      .partials( 'bower_components/fizzy-docs-modules/*/*.hbs', {
        parsePartialName: getPartialBasename,
      })
      .helpers( hbLayouts )
    )
    .pipe( highlight() )
    .pipe( rename({ extname: '.html' }))
    .pipe( gulp.dest('build') );
});

function getPartialBasename( options, file ) {
  return path.basename( file.path, '.hbs' );
}

var transfob = require('transfob');

// add handlebars layouts syntax to use page layout template
function extendPageLayout() {
  return transfob( function( file, enc, next ) {
    var contents = file.contents.toString();
    contents = '{{#extend "page"}}{{#content "main"}}' + contents +
      '{{/content}}{{/extend}}';
    file.contents = new Buffer( contents );
    next( null, file );
  });
}

// --------------------------  -------------------------- //

gulp.task( 'default', [
  'content',
]);


