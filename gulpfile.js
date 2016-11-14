/* jshint node: true, unused: true, undef: true */

var gulp = require('gulp');

// ----- setup ----- //

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
  ],
  isDev: process.argv[2] == 'dev',
};

// files that will be watched, tasks that will be run
var watchables = [];

function watch( src, tasks ) {
  watchables.push( [ src, tasks ] );
}

// ----- tasks ----- //

require('./tasks/assets')( data, watch );
require('./tasks/css')( data, watch );
require('./tasks/js')( data, watch );
require('./tasks/content')( data, watch );
require('./tasks/cache-bust')( data, watch );

// -----  ----- //

gulp.task( 'default', [
  'assets',
  'css',
  'js',
  'content',
]);

gulp.task( 'dev', [ 'assets', 'content' ], function() {
  watchables.forEach( function( watchable ) {
    gulp.watch.apply( gulp, watchable );
  });
});
