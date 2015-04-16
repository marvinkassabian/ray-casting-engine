(function() { //TODO: understand the code, add jQuery
  "use strict";

  ENGINE.namespace('ENGINE.Controls');

  ENGINE.Controls = (function(module) {

    var virtualKeys = ENGINE.VirtualKeys.virtualKeys;

    function Controls() {
      this.codes  = {
        'mouseLeft': 'turnLeft',
        'mouseRight': 'turnRight'
      };
      this.codes[virtualKeys.VK_A] = 'left';
      this.codes[virtualKeys.VK_D] = 'right';
      this.codes[virtualKeys.VK_W] = 'forward';
      this.codes[virtualKeys.VK_S] = 'backward';
      this.codes[virtualKeys.VK_LEFT] = 'turnLeft';
      this.codes[virtualKeys.VK_RIGHT] = 'turnRight';
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
