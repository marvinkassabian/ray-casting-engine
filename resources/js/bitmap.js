(function() {
  "use strict";

  ENGINE.namespace('ENGINE.BITMAP');

  ENGINE.BITMAP = (function() {

    this.BitMap = BitMap;

    return this;

    function BitMap(src, width, height) {
      this.image = new Image();
      this.image.src = src;
      this.width = width;
      this.height = height;
    }

  }).call(ENGINE.BITMAP);

})();
