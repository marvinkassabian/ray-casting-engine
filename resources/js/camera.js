(function() {
  "use strict";

  ENGINE.namespace('ENGINE.Camera');

  ENGINE.Camera = (function(module) {

    var CIRCLE = ENGINE.CIRCLE;
    var clarityFactor = 0.5;
    var defaultFocalLength = 0.8;
    var defaultRange = 14;
    var lightRange = 10;

    function Camera(canvas, resolution, focalLength) {
      this.context = canvas.getContext('2d');
      this.width = canvas.width = window.innerWidth * clarityFactor;
      this.height = canvas.height = window.innerHeight * clarityFactor;
      this.resolution = resolution;
      this.spacing = this.width / resolution;
      this.focalLength = focalLength || defaultFocalLength;
      this.range = defaultRange;
      this.lightRange = lightRange;
    }

    Camera.prototype.render = function(player, map) {
      this.drawSky(player.direction, map.skybox, map.light);
      this.drawColumns(player, map);
    };

    Camera.prototype.drawSky = function(direction, sky, ambient) {
      var width = sky.width * (this.height / sky.height) * 2;
      var left = (direction / CIRCLE) * -width;
      this.context.save();
      this.context.drawImage(sky.image, left, 0, width, this.height);
      if (left < width - this.width) {
        this.context.drawImage(sky.image, left + width, 0, width, this.height);
      }
      //if (ambient > 0) {
      //  this.context.fillStyle = '#ffffff';
      //  this.context.globalAlpha = ambient * 0.1;
      //  this.context.fillRect(0, this.height * 0.5, this.width, this.height * 0.5);
      //}
      this.context.restore();
    };

    Camera.prototype.drawColumns = function(player, map) {
      this.context.save();
      for (var column = 0; column < this.resolution; column++) {
        var x = column / this.resolution - 0.5;
        var angle = Math.atan2(x, this.focalLength);
        var ray = map.cast(player, player.direction + angle, this.range);
        this.drawColumn(column, ray, angle, map);
      }
      this.context.restore();
    };

    Camera.prototype.drawColumn = function(column, ray, angle, map) {
      var context = this.context;
      var texture = map.wallTexture;
      var left = Math.floor(column * this.spacing);
      var width = Math.ceil(this.spacing);
      var hit = 0;
      while (hit < ray.length && ray[hit].height <= 0) {
        hit++;
      }
      for (var s = ray.length - 1; s >= 0; s--) {
        var step = ray[s];
        if (s === hit) {
          var textureX = Math.floor(texture.width * step.offset);
          var wall = this.project(step.height, angle, step.distance);
          //context.globalAlpha = 1;
          context.drawImage(texture.image, textureX, 0, 1, texture.height,
              left, wall.top, width, wall.height);

          //context.fillStyle = '#000000';
          //context.globalAlpha = Math.max((step.distance + step.shading) /
          //    this.lightRange - map.light, 0);
          //context.fillRect(left, wall.top, width, wall.height);
        }

        //context.fillStyle = '#ffffff';
        //context.globalAlpha = 0.15;
      }
    };

    Camera.prototype.project = function(height, angle, distance) {
      var z = distance * Math.cos(angle);
      var wallHeight = this.height * height / z;
      var bottom = this.height / 2 * (1 + 1 / z);
      return {
        top: bottom - wallHeight,
        height: wallHeight
      };
    };

    module.Camera = Camera;

    return module;

  })(ENGINE.Camera);

})();
