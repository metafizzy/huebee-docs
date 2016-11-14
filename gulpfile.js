/* jshint node: true, unused: true, undef: true */

var gulp = require('gulp');
var handlebars = require('gulp-hb');
var rename = require('gulp-rename');
var path = require('path');
var getGlobPaths = require('./tasks/utils/get-glob-paths.js');

// -------------------------- setup -------------------------- //

var data = {
  productName: 'Huebee',
  majorVersion: 1,
  paletteColors: [
    '#D28',
    '#F00',
    '#F80',
    '#08F',
    '#555',
    '#FFF',
  ]
};

// -------------------------- assets -------------------------- //

// move anything in assets/ to build/
gulp.task( 'asset-files', function() {
  return gulp.src('assets/**/*.*')
    .pipe( gulp.dest('build') );
});

gulp.task( 'fonts', function() {
  return gulp.src('fonts/*.*')
    .pipe( gulp.dest('build/fonts') );
});

gulp.task( 'assets', [ 'asset-files', 'fonts' ] );

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
  'bower_components/matches-selector/matches-selector.js',
  'bower_components/unipointer/unipointer.js',
  'bower_components/huebee/huebee.js',
  'bower_components/fizzy-docs-modules/*/*.js',
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
var frontMatter = require('gulp-front-matter');
var path = require('path');
var highlight = require('./tasks/utils/highlight.js');
var pageNav = require('./tasks/utils/page-nav.js');

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

gulp.task( 'content', function() {
  gulp.src('content/*.hbs')
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
      .data('data/*.json')
      .partials( 'layouts/*.hbs')
      .partials( 'modules/**/*/*.hbs', {
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

function getPartialBasename( options, file ) {
  return path.basename( file.path, '.hbs' );
}

var transfob = require('transfob');

// add handlebars layouts syntax to use page layout template
function extendPageLayout() {
  return transfob( function( file, enc, next ) {
    var contents = file.contents.toString();
    contents = '{{#extend "page"}}{{#content "main"}}MAIN_START' + contents +
      'MAIN_END{{/content}}{{/extend}}';
    file.contents = new Buffer( contents );
    next( null, file );
  });
}

// --------------------------  -------------------------- //

gulp.task( 'default', [
  'assets',
  'content',
]);


