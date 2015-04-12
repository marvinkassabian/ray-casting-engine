(function() { //TODO: understand the code, add jQuery
  "use strict";

  ENGINE.namespace('ENGINE.CONTROLS');

  ENGINE.CONTROLS = (function(module) {

    function Controls() {
      this.codes  = {
        37: 'left',
        39: 'right',
        38: 'forward',
        40: 'backward'
      };
      this.states = {
        'left': false,
        'right': false,
        'forward': false,
        'backward': false
      };
      document.addEventListener('keydown', this.onKey.bind(this, true), false);
      document.addEventListener('keyup', this.onKey.bind(this, false), false);
      document.addEventListener('touchstart', this.onTouch.bind(this), false);
      document.addEventListener('touchmove', this.onTouch.bind(this), false);
      document.addEventListener('touchend', this.onTouchEnd.bind(this), false);
    }

    Controls.prototype.onTouch = function(e) {
      var t = e.touches[0];
      this.onTouchEnd(e);
      if (t.pageY < window.innerHeight * 0.5) {
        this.onKey(true, { keyCode: 38 });
      } else if (t.pageX < window.innerWidth * 0.5) {
        this.onKey(true, { keyCode: 37 });
      } else if (t.pageY > window.innerWidth * 0.5) {
        this.onKey(true, { keyCode: 39 });
      }
    };

    Controls.prototype.onTouchEnd = function(e) {
      this.states = {
        'left': false,
        'right': false,
        'forward': false,
        'backward': false
      };
      e.preventDefault();
      e.stopPropagation();
    };

    Controls.prototype.onKey = function(val, e) {
      var state = this.codes[e.keyCode];
      if (typeof state === 'undefined') {
        return;
      }
      this.states[state] = val;
      e.preventDefault && e.preventDefault(); //TODO: add jQuery
      e.stopPropagation && e.stopPropagation(); //TODO: add jQuery
    };

    module.Controls = Controls;

    return module;

  })(ENGINE.CONTROLS);

})();
