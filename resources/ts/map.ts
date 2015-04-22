"use strict";

/// <reference path="bitmap.ts" />

interface Step {
  length: number;
  x?: number;
  y?: number;
}

class GameMap {
  defaultWallProbability: number = 0.3;
  noWall = {
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

  get(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);

    if ((x < 0) || (x >= this.size) || (y < 0) || (y >= this.size)) {
      return -1;
    } else {
      return this.wallGrid[(y * this.size) + x];
    }
  }

  randomize(probability?) {
    var wallProbability = probability || this.defaultWallProbability;
    for (var i = 0; i < (this.size * this.size); i++) {
      this.wallGrid[i] = (Math.random() < wallProbability ? 1 : 0);
    }
  }

  cast(point, angle, range) {
    var self = this;
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    var origin = {
      x: point.x,
      y: point.y,
      height: 0,
      distance: 0
    };

    return ray(origin);

    function ray(origin) {
      var stepX = step(sin, cos, origin.x, origin.y, false);
      var stepY = step(cos, sin, origin.y, origin.x, true);
      var nextStep;

      if (stepX.length < stepY.length) {
        nextStep = inspect(stepX, 1, 0, origin.distance, stepX.y);
      } else {
        nextStep = inspect(stepY, 0, 1, origin.distance, stepY.x);
      }

      if (nextStep.distance > range) {
        return [origin];
      } else {
        return [origin].concat(ray(nextStep));
      }
    }

    function step(rise, run, x, y, inverted): Step {
      if (run === 0) {
        return this.noWall;
      }

      var dx = (run > 0) ?
          Math.floor(x + 1) - x :
          Math.ceil(x - 1) - x;
      var dy = dx * (rise / run);

      var nextStep = {
        x: inverted ? y + dy : x + dx,
        y: inverted ? x + dx : y + dy,
        length: dx * dx + dy * dy
      };

      return nextStep;
    }

    function inspect(step, shiftX, shiftY, distance, offset) {
      var dx = cos < 0 ? shiftX : 0;
      var dy = sin < 0 ? shiftY : 0;

      step.height = self.get(step.x - dx, step.y - dy);
      step.distance = distance + Math.sqrt(step.length);
      step.offset = offset - Math.floor(offset);
      return step;
    }
  }

  update(seconds) {
  }


}
