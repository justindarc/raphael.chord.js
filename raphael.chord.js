/*!
 * Chord 0.1.0 - Raphael plugin
 *
 * Copyright (c) 2011 Justin D'Arcangelo (http://twitter.com/justindarc)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
 
 /*
  * Usage:
  *   var chord = Raphael.chord([data]);
  *   // [data] is an array with 6 fret values (-1 = Muted, 0 = Open, >=1 = Fret)
  *
  *   chord.remove(); // Removes chord
  */
(function(Raphael) {
  
  Raphael.chord = function(x, y, data, label) {
    return new Chord(x, y, data, label);
  };
  
  var Chord = function(x, y, data, label) {
    this.element = Raphael(x, y, 100, 100);
    this.fret = 0;
    this.frets = [];
    this.lines = {};
    
    this.lines.horizontal = [];
    this.lines.vertical = [];
    
    for (var i = 0; i < 6; i++) {
      var position = 20 + (10 * i);
      
      this.lines.horizontal.push(this.element.path('M19.5 ' + position + 'L70.5 ' + position));
      this.lines.vertical.push(this.element.path('M' + position + ' 20L' + position + ' 70'));
    }
    
    // Validate that the data is an array containing 6 elements.
    if (typeof(data) === 'object' && data.length !== undefined && data.length === 6) {
      this.data = data;
      
      var min = 99;
      var max = 0;
      
      for (i = 0; i < 6; i++) {
        min = (this.data[i] < min && this.data[i] > 0) ? this.data[i] : min;
        max = (this.data[i] > max && this.data[i] > 0) ? this.data[i] : max;
      }
      
      if (max > 5) {
        this.fret = min;
      }
      
      var offset = (this.fret > 0) ? this.fret - 1 : 0;
      
      for (i = 0; i < 6; i++) {
        
        // Muted strings.
        if (this.data[i] === -1) {
          this.frets[i] = this.element.path('M' + (16 + (10 * i)) + ' 7L' + (24 + (10 * i)) + ' 15M' + (16 + (10 * i)) + ' 15L' + (24 + (10 * i)) + ' 7');
        }
        
        // Open strings.
        else if (this.data[i] === 0) {
          this.frets[i] = this.element.circle(20 + (10 * i), 11, 3.5);
        }
        
        // All other strings.
        else {
          this.frets[i] = this.element.circle(20 + (10 * i), 15 + (10 * (this.data[i] - offset)), 3.5).attr({
            'fill': '#000'
          });
        }
      }
      
      if (this.fret > 0) {
        this.element.text(84, 24, this.fret + 'fr');
      } else {
        this.lines.top = this.element.path('M19.5 18L70.5 18').attr({
          'stroke-width': 4
        });
      }
      
      if (label) {
        this.label = this.element.text(45, 78, label);
      }
    }
  };
  
  Chord.prototype.remove = function () {
    this.element.remove();
  };
  
})(window.Raphael);
