"use strict";
var GameLoop = (function () {
    function GameLoop() {
        this.frameCallback = this.frame.bind(this);
        this.lastTime = 0;
        this.accumulator = 0;
        this.timestep = GameLoop.defaultTimestep;
        this.updateCallback = function () {
        };
        this.renderCallback = function () {
        };
    }
    GameLoop.prototype.start = function (updateCallback, renderCallback) {
        this.updateCallback = updateCallback;
        this.renderCallback = renderCallback;
        window.requestAnimationFrame(this.frameCallback);
    };
    GameLoop.prototype.frame = function (time) {
        var seconds = (time - this.lastTime) / GameLoop.millisecondsPerSecond;
        this.lastTime = time;
        this.accumulator += seconds;
        while (this.accumulator >= this.timestep) {
            this.accumulator -= this.timestep;
            this.updateCallback(this.timestep);
        }
        this.renderCallback();
        window.requestAnimationFrame(this.frameCallback);
    };
    GameLoop.defaultTimestep = 1 / 30;
    GameLoop.millisecondsPerSecond = 1000;
    return GameLoop;
})();
