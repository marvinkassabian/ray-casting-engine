(function() {
  "use strict";

  ENGINE.namespace('ENGINE.GameLoop');

  ENGINE.GameLoop = (function(module) {

    var defaultTimestep = 1 / 30;
    var secondsPerMillisecond = 1000;

    function GameLoop() {
      this.frame = this.frame.bind(this);
      this.lastTime = 0;
      this.accumulator = 0;
      this.timestep = defaultTimestep;
      this.callback = function() {
      };
      this.render = function() {
      };
    }

    GameLoop.prototype.start = function(updateCallback, renderCallback) {
      this.updateCallback = updateCallback;
      this.renderCallback = renderCallback;
      window.requestAnimationFrame(this.frame);
    };

    GameLoop.prototype.frame = function(time) {
      var seconds = (time - this.lastTime) / secondsPerMillisecond;
      this.lastTime = time;
      this.accumulator += seconds;

      while (this.accumulator >= this.timestep) {
        this.accumulator -= this.timestep;
        this.updateCallback(this.timestep);
      }
      this.renderCallback();

      window.requestAnimationFrame(this.frame);
    };

    module.GameLoop = GameLoop;

    return module;

  })(ENGINE.GameLoop);

})();
