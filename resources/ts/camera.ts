"use strict";

module Engine.Camera {

  import Bitmap = Engine.Bitmap.Bitmap;
  import Step = Engine.GameMap.Step;
  import GameMap = Engine.GameMap.GameMap;

  var CLARITY_FACTOR: number = 1;
  var DEFAULT_FOCAL_LENGTH: number = 0.8;
  var DEFAULT_RANGE: number = 10;
  var CIRCLE: number = Math.PI * 2;

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
    }

    render(entity: Entity, map: GameMap): void {
      this.drawSky(entity.direction, map.skybox);
      this.drawColumns(entity, map);
    }

    drawSky(direction: number, sky: Bitmap): void {
      var width: number = sky.width * (this.height / sky.height) * 2;
      var left: number = (direction / CIRCLE) * -width;
      this.context.save();
      this.context.drawImage(
          sky.image,    //image
          left,         //offsetX
          0,            //offsetY
          width,        //width
          this.height); //height
      if (left < width - this.width) {
        this.context.drawImage(
            sky.image,    //image
            left + width, //offsetX
            0,            //offsetY
            width,        //width
            this.height); //height
      }
      this.context.restore();
    }

    drawColumns(entity: Entity, map: GameMap): void {
      this.context.save();
      for (var column: number = 0; column < this.resolution; column++) {
        var x: number = column / this.resolution - 0.5;
        var angle: number = Math.atan2(x, this.focalLength);
        var ray: Step[] = map.cast(entity, entity.direction + angle, this.range);
        this.drawColumn(column, ray, angle, map, entity.getHeight());
      }
      this.context.restore();
    }

    drawColumn(column: number, ray: Step[], angle: number, map: GameMap, cameraHeight: number): void {
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
          var wall: Wall = this.project(step.height, angle, step.distance, cameraHeight);
          context.drawImage(
              texture.image,  //image
              textureX,       //offsetX
              0,              //offsetY
              1,              //width
              texture.height, //height
              left,           //canvasOffsetX
              wall.top,       //canvasOffsetY
              width,          //canvasImageWidth
              wall.height);   //canvasImageHeight
        }
      }
    }

    project(height: number, angle: number, distance: number, cameraHeight: number): Wall {
      var z = distance * Math.cos(angle);
      var wallHeight = this.height * height / z;
      var bottom = this.height / 2 * (1 + 1 / z);
      return {
        top: bottom - (wallHeight / cameraHeight),
        height: (wallHeight * cameraHeight)
      };
    }
  }
}
