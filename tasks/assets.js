var gulp = require('gulp');

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

module.exports = function() {};
