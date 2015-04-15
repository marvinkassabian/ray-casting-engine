(function() { //TODO: understand the code, add jQuery
  "use strict";

  ENGINE.namespace('ENGINE.Controls');

  ENGINE.Controls = (function(module) {

    function Controls() {//37:left, 39:right, 38:up, 40:down
      this.codes  = { //65:a, 68:d, 87:w, 83:s, 81:q, 69:e
        65: 'left',
        68: 'right',
        87: 'forward',
        83: 'backward',
        37: 'turnLeft',
        39: 'turnRight',
        'mouseLeft': 'turnLeft',
        'mouseRight': 'turnRight'
      };
      this.states = {
        'left': false,
        'right': false,
        'forward': false,
        'backward': false,
        'turnLeft': false,
        'turnRight': false
      };
      document.addEventListener('keydown',
          this.onKey.bind(this, true), false);
      document.addEventListener('keyup',
          this.onKey.bind(this, false), false);
      document.addEventListener('mousemove',
          this.onMouseMove.bind(this), false);
      document.body.onclick = document.body.requestPointerLock ||
          document.body.mozRequestPointerLock ||
          document.body.webkitRequestPointerLock;
    }

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

    Controls.prototype.onMouseMove = function(e) {
      var leftState = this.codes.mouseLeft;
      var rightState = this.codes.mouseRight;
      var x = (e.movementX || e.mozMovementX || e.webkitMovementX || 0);
      if (x > 0) {
        this.states[rightState] = true;
      } else if (x < 0) {
        this.states[leftState] = true;
      }

      var that = this;
      setTimeout(function() {
        that.onMouseMoveEnd(e);
      }, 10);
    };

    Controls.prototype.onMouseMoveEnd = function(e) {
      this.states.turnLeft = false;
      this.states.turnRight = false;
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
    };

    module.Controls = Controls;

    return module;

  })(ENGINE.Controls);

})();
