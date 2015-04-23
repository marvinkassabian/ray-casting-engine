"use strict";

module Engine.GameLoop {

  export class GameLoop {

    private static DEFAULT_TIMESTEP: number = 1 / 30;
    private static MILLISECONDS_PER_SECOND: number = 1000;

    frameCallback: FrameRequestCallback;
    lastTime: number;
    accumulator: number;
    timestep: number;
    updateCallback: Function;
    renderCallback: Function;

    constructor() {
      this.frameCallback = this.frame.bind(this);
      this.lastTime = 0;
      this.accumulator = 0;
      this.timestep = GameLoop.DEFAULT_TIMESTEP;
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

    frame(time: number) {
      var seconds: number = (time - this.lastTime) / GameLoop.MILLISECONDS_PER_SECOND;
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
