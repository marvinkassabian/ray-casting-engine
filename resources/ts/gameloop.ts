"use strict";

module Engine.GameLoop {

  var DEFAULT_TIMESTEP: number = 1 / 30;
  var MILLISECONDS_PER_SECOND: number = 1000;

  export class GameLoop {

    frameCallback: FrameRequestCallback;
    lastTime: number;
    accumulator: number;
    timestep: number;
    updateCallback: Function;
    renderCallback: Function;

    constructor(timestep: number = DEFAULT_TIMESTEP) {
      this.frameCallback = this.frame.bind(this);
      this.lastTime = 0;
      this.accumulator = 0;
      this.timestep = timestep;
      this.updateCallback = function() {
      };
      this.renderCallback = function() {
      };
    }


    start(updateCallback: Function, renderCallback: Function) {
      this.updateCallback = updateCallback;
      this.renderCallback = renderCallback;
      window.requestAnimationFrame(this.frameCallback);
    }

    private frame(time: number) {
      var seconds: number = (time - this.lastTime) / MILLISECONDS_PER_SECOND;
      this.lastTime = time;
      this.accumulator += seconds;

      while (this.accumulator >= this.timestep) {
        this.accumulator -= this.timestep;
        this.updateCallback(this.timestep);
      }
      this.renderCallback();

      window.requestAnimationFrame(this.frameCallback);
    }
  }
}
