"use strict";

/// <reference path="bitmap.ts" />

interface Step {
  length: number;
  x?: number;
  y?: number;
  height?: number;
  distance?: number;
  offset?: number;
}

class GameMap {

  private static defaultWallProbability: number = 0.3;
  private static noWall: Step = {
    length: Infinity
  };

  size: number;
  wallGrid: Uint8Array;
  skybox: Bitmap;
  wallTexture: Bitmap;

  constructor(size: number) {
    this.size = size;
    this.wallGrid = new Uint8Array(size * size);
    this.skybox = new Bitmap(
      'resources/images/sky_texture.png', 128, 64);
    this.wallTexture = new Bitmap(
      'resources/images/wall_texture.png', 640, 640);
  }

  get(x: number, y: number): number {
    x = Math.floor(x);
    y = Math.floor(y);

    if ((x < 0) || (x >= this.size) || (y < 0) || (y >= this.size)) {
      return -1;
    } else {
      return this.wallGrid[(y * this.size) + x];
    }
  }

  randomize(probability?: number): void {
    var wallProbability: number = probability || GameMap.defaultWallProbability;
    for (var i: number = 0; i < (this.size * this.size); i++) {
      this.wallGrid[i] = (Math.random() < wallProbability ? 1 : 0);
    }
  }

  cast(point: GamePlayer, angle: number, range: number): Step[] {
    var _this: GameMap = this;
    var sin: number = Math.sin(angle);
    var cos: number = Math.cos(angle);

    var origin: Step = {
      x: point.x,
      y: point.y,
      height: 0,
      distance: 0,
      length: 0
    };

    return ray(origin);

    function ray(origin: Step): Step[] {
      var stepX: Step = step(sin, cos, origin.x, origin.y, false);
      var stepY: Step = step(cos, sin, origin.y, origin.x, true);
      var nextStep: Step = (stepX.length < stepY.length)
          ? inspect(stepX, 1, 0, origin.distance, stepX.y)
          : inspect(stepY, 0, 1, origin.distance, stepY.x);

      if (nextStep.distance > range) {
        return [origin];
      } else {
        return [origin].concat(ray(nextStep));
      }
    }

    function step(rise: number, run: number, x: number, y: number, inverted: boolean): Step {
      if (run === 0) {
        return GameMap.noWall;
      }

      var dx: number = (run > 0) ?
          Math.floor(x + 1) - x :
          Math.ceil(x - 1) - x;
      var dy: number = dx * (rise / run);

      var nextStep: Step = {
        x: inverted ? y + dy : x + dx,
        y: inverted ? x + dx : y + dy,
        length: dx * dx + dy * dy
      };

      return nextStep;
    }

    function inspect(step: Step, shiftX: number, shiftY: number, distance: number, offset: number): Step {
      var dx: number = cos < 0 ? shiftX : 0;
      var dy: number = sin < 0 ? shiftY : 0;

      step.height = _this.get(step.x - dx, step.y - dy);
      step.distance = distance + Math.sqrt(step.length);
      step.offset = offset - Math.floor(offset);
      return step;
    }
  }

  update(timestep: number): void {
  }


}
