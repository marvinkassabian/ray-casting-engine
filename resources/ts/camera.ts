"use strict";

module Engine.Camera {

  import Bitmap = Engine.Bitmap.Bitmap;
  import Step = Engine.GameMap.Step;
  import GameMap = Engine.GameMap.GameMap;
  import Util = Engine.Util;

  var CLARITY_FACTOR: number = 0.5;
  var DEFAULT_FOCAL_LENGTH: number = 0.8;
  var DEFAULT_RANGE: number = 10;
  var VERTICAL_BUFFER: number = 3000;
  var HORIZONTAL_BUFFER: number;

  export interface Wall {
    top: number;
    height: number;
  }

  export class Camera {

    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    resolution: number;
    spacing: number;
    focalLength: number;
    range: number;
    viewAngle: number;
    cameraHeight: number;


    constructor(canvas: HTMLCanvasElement, resolution: number,
        focalLength: number = DEFAULT_FOCAL_LENGTH,
        range: number = DEFAULT_RANGE) {
      this.context = canvas.getContext('2d');
      this.width = canvas.width = window.innerWidth * CLARITY_FACTOR;
      this.height = canvas.height = window.innerHeight * CLARITY_FACTOR;
      this.resolution = resolution;
      this.spacing = this.width / resolution;
      this.focalLength = focalLength;
      this.range = range;
      HORIZONTAL_BUFFER = VERTICAL_BUFFER * (this.width / this.height);
      this.viewAngle = 0;
      this.cameraHeight = 0;
    }

    render(entity: Entity, map: GameMap): void {
      this.viewAngle = entity.getHeightInformation().viewAngle;
      this.cameraHeight = entity.getHeightInformation().heightModifier;
      this.drawSky(entity.direction, map.skybox);
      this.drawColumns(entity, map);
    }

    private drawSky(direction: number, sky: Bitmap): void {
      var width: number = sky.width * (this.height / sky.height) + HORIZONTAL_BUFFER;
      var left: number = (direction / Util.CIRCLE) * -width;
      this.context.save();

      var drawSkyPartial = (canvasOffsetX: number): void => {
        this.context.drawImage(
            sky.image, //image
            canvasOffsetX, //canvasOffsetX
            this.viewAngle - (VERTICAL_BUFFER / 2) + this.cameraHeight, //canvasOffsetY
            width, //canvasImageWidth
            this.height + VERTICAL_BUFFER + this.cameraHeight); //canvasImageHeight
      }

      drawSkyPartial(left);
      if (left < width - this.width) {
        drawSkyPartial(left + width);
      }
      this.context.restore();
    }

    private drawColumns(entity: Entity, map: GameMap): void {
      this.context.save();
      for (var column: number = 0; column < this.resolution; column++) {
        var x: number = column / this.resolution - 0.5;
        var angle: number = Math.atan2(x, this.focalLength);
        var ray: Step[] = map.cast(entity, entity.direction + angle, this.range);
        this.drawColumn(column, ray, angle, map);
      }
      this.context.restore();
    }

    private drawColumn(column: number, ray: Step[], angle: number, map: GameMap): void {
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
          context.drawImage(
              texture.image, //image
              textureX, //offsetX
              0, //offsetY
              1, //width
              texture.height, //height
              left, //canvasOffsetX
              wall.top + this.viewAngle + this.cameraHeight, //canvasOffsetY
              width, //canvasImageWidth
              wall.height + this.cameraHeight); //canvasImageHeight
        }
      }
    }

    private project(height: number, angle: number, distance: number): Wall {
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
