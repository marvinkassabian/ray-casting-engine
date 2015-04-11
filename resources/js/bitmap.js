(function() {
  "use strict";

  ENGINE.namespace('ENGINE.BITMAP');

  ENGINE.BITMAP = (function(module) {

    module.BitMap = BitMap;

    return module;

    function BitMap(src, width, height) {
      this.image = new Image();
      this.image.src = src;
      this.width = width;
      this.height = height;
    }

  })(ENGINE.BITMAP);

})();
