var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task( 'cache-bust-js', function() {
  return gulp.src('data/cache-versions.json')
    .pipe( replace( /"js": (\d+)/, function( match, num ) {
      num = parseInt( num ) + 1;
      return '"js": ' + num;
    }))
    .pipe( gulp.dest('data') );
});

gulp.task( 'cache-bust-css', function() {
  return gulp.src('data/cache-versions.json')
    .pipe( replace( /"css": (\d+)/, function( match, num ) {
      num = parseInt( num ) + 1;
      return '"css": ' + num;
    }))
    .pipe( gulp.dest('data') );
});

gulp.task( 'cache-bust', [ 'cache-bust-js', 'cache-bust-css' ] );
// shorthand
gulp.task( 'cb', [ 'cache-bust' ] );

module.exports = function() {};
