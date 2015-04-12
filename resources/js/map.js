(function() {
  "use strict";

  ENGINE.namespace('ENGINE.MAP');

  ENGINE.MAP = (function(module) {

    var noWall = {
      length: Infinity
    };

    var ray = function(origin, sin, cos, range, self) {
      var stepX = step(sin, cos, origin.x, origin.y, false);
      var stepY = step(cos, sin, origin.y, origin.x, true);
      var nextStep;

      if (stepX.length < stepY.length) {
        nextStep = inspect(stepX, 1, 0, origin.distance,
            stepX.y, sin, cos, self);
      } else {
        nextStep = inspect(stepY, 0, 1, origin.distance,
            stepY.x, sin, cos, self);
      }

      if (nextStep.distance > range) {
        return [origin];
      } else {
        return [origin].concat(ray(nextStep, sin, cos, range, self));
      }
    };

    var step = function(rise, run, x, y, inverted) { //TODO: Understand inverted
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
    };

    var inspect = function(step, shiftX, shiftY, distance,
        offset, sin, cos, self) {
      var dx = cos < 0 ? shiftX : 0;
      var dy = sin < 0 ? shiftY : 0;

      step.height = self.get(step.x - dx, step.y - dy);
      step.distance = distance + Math.sqrt(step.length);
      if (shiftX) {
        step.shading = (cos < 0) ? 2 : 0; //TODO: magic number
      } else {
        step.shading = (sin < 0) ? 2 : 1; //TODO: magic number
      }
      step.offset = offset - Math.floor(offset);
      return step;
    };

    function Map(size) {
      this.size = size;
      this.wallGrid = new Uint8Array(size * size);
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

    Map.prototype.randomize = function() {
      for (var i = 0; i < (this.size * this.size); i++) {
        this.wallGrid[i] = (Math.random() < 0.3 ? 1 : 0); //TODO: magic number
      }
    };

    Map.prototype.cast = function(point, angle, range) {
      var self = this;
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);

      var origin = {
        x: point.x,
        y: point.y,
        height: 0,
        distance: 0
      };

      return ray(origin, sin, cos, range, self);
    };

    module.Map = Map;

    return module;

  })(ENGINE.MAP);

})();
