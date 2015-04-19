(function() {
  "use strict";

  ENGINE.namespace('ENGINE.Map');

  ENGINE.Map = (function(module) {

    var Bitmap = ENGINE.Bitmap.Bitmap;

    var defaultWallProbability = 0.3;
    var noWall = {
      length: Infinity
    };

    function Map(size) {
      this.size = size;
      this.wallGrid = new Uint8Array(size * size);
      this.skybox = new Bitmap('resources/images/black_sky_texture.jpg',
          3540, 2220);
      this.wallTexture = new Bitmap('resources/images/green_wall_texture.png',
          300, 300);
      this.light = 0;
    }

    Map.prototype.get = function(x, y) {
      x = Math.floor(x);
      y = Math.floor(y);

      if ((x < 0) || (x >= this.size) || (y < 0) || (y >= this.size)) {
        return -1;
      } else {
        return this.wallGrid[(y * this.size) + x];
      }
    };

    Map.prototype.randomize = function(probability) {
      var wallProbability = probability || defaultWallProbability;
      for (var i = 0; i < (this.size * this.size); i++) {
        this.wallGrid[i] = (Math.random() < wallProbability ? 1 : 0);
      }
    };

    Map.prototype.cast = function(point, angle, range) {
      var self = this;
      var sin = ENGINE.sin(angle);
      var cos = ENGINE.cos(angle);

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
          nextStep = inspect(stepX, 1, 0, origin.distance,
              stepX.y);
        } else {
          nextStep = inspect(stepY, 0, 1, origin.distance,
              stepY.x);
        }

        if (nextStep.distance > range) {
          return [origin];
        } else {
          return [origin].concat(ray(nextStep));
        }
      }

      function step(rise, run, x, y, inverted) { //TODO: Understand inverted
        if (run === 0) {
          return noWall;
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
        if (shiftX) {
          step.shading = (cos < 0) ? 2 : 0;
        } else {
          step.shading = (sin < 0) ? 2 : 1;
        }
        step.offset = offset - Math.floor(offset);
        return step;
      }
    };

    Map.prototype.update = function(seconds) {
      if (this.light > 0) {
        this.light = Math.max(this.light - 10 * seconds, 0);
      }
    };

    module.Map = Map;

    return module;

  })(ENGINE.Map);

})();
