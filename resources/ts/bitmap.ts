"use strict";

module Engine.Bitmap {

  export class Bitmap {

    image: HTMLImageElement;
    width: number;
    height: number;

    constructor(src: string, width: number, height: number) {
      this.image = new Image();
      this.image.src = src;
      this.width = width;
      this.height = height;
    }
  }
}
