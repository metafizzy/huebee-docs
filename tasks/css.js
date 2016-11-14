var gulp = require('gulp');
var concat = require('gulp-concat');
var getGlobPaths = require('./utils/get-glob-paths');

var cssSrc = [
  'bower_components/*/*.css',
  'bower_components/fizzy-docs-modules/*/*.css',
  'css/*.css',
  'modules/**/*/*.css',
];

gulp.task( 'css', function() {
  gulp.src( cssSrc )
    .pipe( concat('huebee-docs.css') )
    .pipe( gulp.dest('build/css') );
});

module.exports = function( data ) {
  data.cssPaths = getGlobPaths( cssSrc );
};
