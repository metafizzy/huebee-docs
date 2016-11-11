HD.hero = function( elem ) {

  var pickers = elem.querySelectorAll('.hero-picker');

  var palette = [];
  var huebs = [];

  var stripe1 = elem.querySelector('.huebee-logo__stripe1');
  var stripe2 = elem.querySelector('.huebee-logo__stripe2');
  var stripe3 = elem.querySelector('.huebee-logo__stripe3');
  var stripe4 = elem.querySelector('.huebee-logo__stripe4');
  var lines = elem.querySelectorAll('.huebee-logo__line');

  for ( var i=0; i < pickers.length; i++ ) {
    var picker = pickers[i];
    var origColor = picker.getAttribute('data-color');
    palette.push( origColor );
    var hueb = new Huebee( picker, {
      setBGColor: true,
    });
    hueb.origColor = origColor;
    huebs.push( hueb );
    var onChange = getOnChange( i );
    if ( onChange ) {
      hueb.on( 'change', onChange );
    }
  }

  var changeBehaviors = {
    0: function( color ) {
      stripe1.style.fill = color;
    },
    1: function( color ) {
      stripe2.style.fill = color;
    },
    2: function( color ) {
      stripe3.style.fill = color;
    },
    3: function( color ) {
      stripe4.style.fill = color;
    },
    4: function( color ) {
      for ( var i=0; i < lines.length; i++ ) {
        lines[i].style.stroke = color;
      }
    }
  };

  function getOnChange( index ) {
    return function( color ) {
      var behavior = changeBehaviors[ index ];
      if ( behavior ) {
        behavior( color );
      }
      palette[ index ] = color;
      updatePaletteStyles();
    };
  }

  var styleElem = document.querySelector('#palette-styles');

  function updatePaletteStyles() {
    var text = '';

    palette.forEach( function( color, i ) {
      var selector = '.color' + i;
      text += selector + '-text, ' + selector + '-text-hover:hover ' +
        '{ color: ' + color + '; } \n';
      text += selector + '-bg, ' + selector + '-bg-hover:hover ' +
        '{ background-color: ' + color + '; } \n';
    });
    // extras
    text += 'a { color: ' + palette[1] + '; }';
    text += 'a:hover { color: ' + palette[3] + '; }';
    text += '.main h2 { color: ' + palette[2] + '; }';

    styleElem.textContent = text;
  }

  var resetButton = elem.querySelector('.hero__reset-button');
  resetButton.addEventListener( 'click', function() {
    huebs.forEach( function( hueb ) {
      hueb.setColor( hueb.origColor );
    });
  });

};
