HuebeeDocs['change-svg'] = function( elem ) {
  var fillHueb = new Huebee( elem.querySelector('.change-svg__input--fill') );
  var strokeHueb = new Huebee( elem.querySelector('.change-svg__input--stroke') );

  var circle = elem.querySelector('.change-svg__svg__circle');

  fillHueb.on( 'change', function( color ) {
    circle.style.fill = color;
  });
  strokeHueb.on( 'change', function( color ) {
    circle.style.stroke = color;
  });
};
