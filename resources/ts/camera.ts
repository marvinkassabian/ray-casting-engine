"use strict";

module Engine.Camera {

  import Bitmap = Engine.Bitmap.Bitmap;
  import Step = Engine.GameMap.Step;
  import GameMap = Engine.GameMap.GameMap;
  import CIRCLE = Engine.Util.CIRCLE;

  var CLARITY_FACTOR: number = 1;
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
    }

    render(entity: Entity, map: GameMap): void {
      this.drawSky(entity.direction, map.skybox, entity.getHeightInformation());
      this.drawColumns(entity, map);
    }

    private drawSky(direction: number, sky: Bitmap, heightInfo: RenderingInformation): void {
      var width: number = sky.width * (this.height / sky.height) + HORIZONTAL_BUFFER;
      var left: number = (direction / CIRCLE) * -width;
      this.context.save();

      var drawSkyPartial = (canvasOffsetX: number): void => {
        this.context.drawImage(
            sky.image, //image
            canvasOffsetX, //canvasOffsetX
            heightInfo.viewModifier - (VERTICAL_BUFFER / 2), //canvasOffsetY
            width, //canvasImageWidth
            this.height + VERTICAL_BUFFER); //canvasImageHeight
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
        this.drawColumn(column, ray, angle, map, entity.getHeightInformation());
      }
      this.context.restore();
    }

    private drawColumn(column: number, ray: Step[], angle: number, map: GameMap,
        heightInfo: RenderingInformation): void {
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
              wall.top + heightInfo.viewModifier, //canvasOffsetY
              width, //canvasImageWidth
              wall.height); //canvasImageHeight
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
