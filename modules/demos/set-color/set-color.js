HuebeeDocs['set-color'] = function( elem ) {
  var input = elem.querySelector('.demo-input');
  var hueb = new Huebee( input, {
    staticOpen: true,
  });

  var buttonRow = elem.querySelector('.button-row');
  buttonRow.addEventListener( 'click', function( event ) {
    var buttonColor = event.target.getAttribute('data-color');
    if ( buttonColor ) {
      hueb.setColor( buttonColor );
    }
  });
};
