(function() {
  "use strict";

  ENGINE.namespace('ENGINE.GAMELOOP');

  ENGINE.GAMELOOP = (function(module) {

    var defaultTimestep = 1 / 120;

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
      var seconds = (time - this.lastTime) / 1000; //TODO: magic number
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

  })(ENGINE.GAMELOOP);

})();
