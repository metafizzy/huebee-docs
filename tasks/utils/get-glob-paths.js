var glob = require('glob');

module.exports = function( src ) {
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
};
