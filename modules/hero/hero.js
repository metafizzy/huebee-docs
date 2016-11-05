HD.hero = function( elem ) {

  var pickers = elem.querySelectorAll('.hero-picker');

  var customColors = [ '#C25', '#E62', '#EA0', '#19F', '#333' ];

  var stripe1 = elem.querySelector('.huebee-logo__stripe1');
  var stripe2 = elem.querySelector('.huebee-logo__stripe2');
  var stripe3 = elem.querySelector('.huebee-logo__stripe3');
  var stripe4 = elem.querySelector('.huebee-logo__stripe4');
  var lines = elem.querySelectorAll('.huebee-logo__line');

  var changeBehaviors = {
    '#C25': function( color ) {
      stripe1.style.fill = color;
    },
    '#E62': function( color ) {
      stripe2.style.fill = color;
    },
    '#EA0': function( color ) {
      stripe3.style.fill = color;
    },
    '#19F': function( color ) {
      stripe4.style.fill = color;
    },
    '#333': function( color ) {
      for ( var i=0; i < lines.length; i++ ) {
        lines[i].style.stroke = color;
      }
    },
    '#FFF': function( color ) {
      document.body.style.backgroundColor = color;
    },
  };

  for ( var i=0; i < pickers.length; i++ ) {
    var picker = pickers[i];
    var origColor = picker.getAttribute('data-color');
    var hueb = new Huebee( picker, {
      setBGColor: true,
      customColors: customColors,
    });
    var onChange = changeBehaviors[ origColor ];
    if ( onChange ) {
      hueb.on( 'change', onChange );
    }
    
  }

};
