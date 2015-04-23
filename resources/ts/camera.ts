"use strict";

module Engine.Camera {

  import Bitmap = Engine.Bitmap.Bitmap;
  import Step = Engine.GameMap.Step;
  import GameMap = Engine.GameMap.GameMap;

  export interface Wall {
    top: number;
    height: number;
  }

  export class Camera {

    private static CLARITY_FACTOR: number = 0.5;
    private static DEFAULT_FOCAL_LENGTH: number = 0.8;
    private static DEFAULT_RANGE: number = 10;
    private static CIRCLE: number = Math.PI * 2;

    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    resolution: number;
    spacing: number;
    focalLength: number;
    range: number;

    constructor(canvas: HTMLCanvasElement, resolution: number,
        focalLength: number) {
      this.context = canvas.getContext('2d');
      this.width = canvas.width = window.innerWidth * Camera.CLARITY_FACTOR;
      this.height = canvas.height = window.innerHeight * Camera.CLARITY_FACTOR;
      this.resolution = resolution;
      this.spacing = this.width / resolution;
      this.focalLength = focalLength || Camera.DEFAULT_FOCAL_LENGTH;
      this.range = Camera.DEFAULT_RANGE;
    }

    render(entity: Entity, map: GameMap): void {
      this.drawSky(entity.direction, map.skybox);
      this.drawColumns(entity, map);
    }

    drawSky(direction: number, sky: Bitmap): void {
      var width: number = sky.width * (this.height / sky.height) * 2;
      var left: number = (direction / Camera.CIRCLE) * -width;
      this.context.save();
      this.context.drawImage(sky.image, left, 0, width, this.height);
      if (left < width - this.width) {
        this.context.drawImage(sky.image, left + width, 0, width, this.height);
      }
      this.context.restore();
    }

    drawColumns(entity: Entity, map: GameMap): void {
      this.context.save();
      for (var column: number = 0; column < this.resolution; column++) {
        var x: number = column / this.resolution - 0.5;
        var angle: number = Math.atan2(x, this.focalLength);
        var ray: Step[] = map.cast(entity, entity.direction + angle, this.range);
        this.drawColumn(column, ray, angle, map);
      }
      this.context.restore();
    }

    drawColumn(column: number, ray: Step[], angle: number, map: GameMap): void {
      var context: CanvasRenderingContext2D = this.context;
      var texture: Bitmap = map.wallTexture;
      var left: number = Math.floor(column * this.spacing);
      var width: number = Math.ceil(this.spacing);
      var hit: number = 0;
      while (hit < ray.length && ray[hit].height <= 0) {
        hit++;
      }
      for (var s: number = ray.length - 1; s >= 0; s--) {
        var step: Step = ray[s];
        if (s === hit) {
          var textureX: number = Math.floor(texture.width * step.offset);
          var wall: Wall = this.project(step.height, angle, step.distance);
          context.drawImage(texture.image, textureX, 0, 1, texture.height,
              left, wall.top, width, wall.height);
        }
      }
    }

    project(height: number, angle: number, distance: number): Wall {
      var z = distance * Math.cos(angle);
      var wallHeight = this.height * height / z;
      var bottom = this.height / 2 * (1 + 1 / z);
      return {
        top: bottom - wallHeight,
        height: wallHeight
      };
    }
  }
}
