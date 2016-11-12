/* jshint browser: true, unused: true, undef: true */
/* globals HuebeeDocs */

( function() {
  // init all modules, based on their data-js-module attribute
  var jsElems = document.querySelectorAll('[data-js]');
  for ( var i=0; i < jsElems.length; i++ ) {
    var elem = jsElems[i];
    var moduleName = elem.getAttribute('data-js');
    var module = HuebeeDocs[ moduleName ] || FizzyDocs[ moduleName ];
    if ( module ) {
      module( elem );
    }
  }

})();
