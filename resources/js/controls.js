(function() { //TODO: understand the code, add jQuery
  "use strict";

  ENGINE.namespace('ENGINE.CONTROLS');

  ENGINE.CONTROLS = (function(module) {

    function Controls() {//37:left, 39:right, 38:up, 40:down
      this.codes  = { //65:a, 68:d, 87:w, 83:s, 81:q, 69:e
        65: 'left',
        68: 'right',
        87: 'forward',
        83: 'backward',
        37: 'turnLeft',
        39: 'turnRight'
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
        this.onKey(true, { keyCode: 87 });
      } else if (t.pageX < window.innerWidth * 0.5) {
        this.onKey(true, { keyCode: 81 });
      } else if (t.pageY > window.innerWidth * 0.5) {
        this.onKey(true, { keyCode: 69 });
      }
    };

    Controls.prototype.onTouchEnd = function(e) {
      this.states = {
        'left': false,
        'right': false,
        'forward': false,
        'backward': false,
        'turnLeft': false,
        'turnRight': false
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
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
    };

    module.Controls = Controls;

    return module;

  })(ENGINE.CONTROLS);

})();
