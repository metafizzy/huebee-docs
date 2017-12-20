var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var getGlobPaths = require('./utils/get-glob-paths');

var jsSrc = [
  // components
  'bower_components/ev-emitter/ev-emitter.js',
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

gulp.task( 'js', function() {
  gulp.src( jsSrc )
    .pipe( uglify() )
    .pipe( concat('huebee-docs.min.js') )
    .pipe( gulp.dest('build/js') );
});

module.exports = function( data ) {
  data.jsPaths = getGlobPaths( jsSrc );
};
