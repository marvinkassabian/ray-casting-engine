(function() {
  "use strict";

  ENGINE.namespace('ENGINE.Bitmap');

  ENGINE.Bitmap = (function(module) {

    function Bitmap(src, width, height) {
      this.image = new Image();
      this.image.src = src;
      this.width = width;
      this.height = height;
    }

    module.Bitmap = Bitmap;

    return module;

  })(ENGINE.Bitmap);

})();
