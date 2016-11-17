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
  isExport: process.argv[2] == 'export',
};

data.sourceUrlPath = data.isExport ? '' : 'https://unpkg.com/huebee@1/dist/';

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
require('./tasks/dist')( data, watch );

// -----  ----- //

gulp.task( 'default', [
  'assets',
  'dist',
  'css',
  'js',
  'content',
]);

// ----- export ----- //

// version of site used in huebee-docs.zip
gulp.task( 'export', [
  'dist',
  'css',
  'js',
  'content',
]);

// ----- dev ----- //

gulp.task( 'dev', [ 'assets', 'content' ], function() {
  watchables.forEach( function( watchable ) {
    gulp.watch.apply( gulp, watchable );
  });
});
