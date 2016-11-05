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

var data = {};

// -------------------------- css -------------------------- //

var cssSrc = [
  'bower_components/*/*.css',
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

gulp.task( 'content', function() {
  gulp.src('layouts/page.hbs')
    .pipe( handlebars()
      .data( data )
      .partials( 'modules/**/*/*.hbs', {
        parsePartialName: function( options, file ) {
          return path.basename( file.path, '.hbs' );
        }
      } )
    )
    .pipe( rename({ extname: '.html' }))
    .pipe( gulp.dest('build') );
});

gulp.task( 'default', [
  'content',
]);
