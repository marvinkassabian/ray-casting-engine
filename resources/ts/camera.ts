"use strict";

class Camera {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  resolution: number;
  spacing: number;
  focalLength: number;
  range: number;

  private static clarityFactor: number = 0.5;
  private static defaultFocalLength: number = 0.8;
  private static defaultRange: number = 10;
  private static CIRCLE: number = Math.PI * 2;

  constructor(canvas: HTMLCanvasElement, resolution: number,
      focalLength: number) {
    this.context = canvas.getContext('2d');
    this.width = canvas.width = window.innerWidth * Camera.clarityFactor;
    this.height = canvas.height = window.innerHeight * Camera.clarityFactor;
    this.resolution = resolution;
    this.spacing = this.width / resolution;
    this.focalLength = focalLength || Camera.defaultFocalLength;
    this.range = Camera.defaultRange;
  }

  render(player: any, map: any) {
    this.drawSky(player.direction, map.skybox, map.light);
    this.drawColumns(player, map);
  }

  drawSky(direction, sky, ambient) {
    var width = sky.width * (this.height / sky.height) * 2;
    var left = (direction / Camera.CIRCLE) * -width;
    this.context.save();
    this.context.drawImage(sky.image, left, 0, width, this.height);
    if (left < width - this.width) {
      this.context.drawImage(sky.image, left + width, 0, width, this.height);
    }
    this.context.restore();
  }

  drawColumns(player: any, map: any) {
    this.context.save();
    for (var column = 0; column < this.resolution; column++) {
      var x = column / this.resolution - 0.5;
      var angle = Math.atan2(x, this.focalLength);
      var ray = map.cast(player, player.direction + angle, this.range);
      this.drawColumn(column, ray, angle, map);
    }
    this.context.restore();
  }

  drawColumn(column: any, ray: any, angle: any, map: any) {
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
        context.drawImage(texture.image, textureX, 0, 1, texture.height,
            left, wall.top, width, wall.height);
      }

    }
  }

  project(height: any, angle: any, distance: any) {
    var z = distance * Math.cos(angle);
    var wallHeight = this.height * height / z;
    var bottom = this.height / 2 * (1 + 1 / z);
    return {
      top: bottom - wallHeight,
      height: wallHeight
    };
  }
}
