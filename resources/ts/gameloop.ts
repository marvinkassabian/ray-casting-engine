"use strict";

class GameLoop {

  private static defaultTimestep: number = 1 / 30;
  private static millisecondsPerSecond: number = 1000;

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
    this.timestep = GameLoop.defaultTimestep;
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
    var seconds: number = (time - this.lastTime) / GameLoop.millisecondsPerSecond;
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
