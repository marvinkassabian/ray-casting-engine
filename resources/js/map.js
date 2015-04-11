(function() {
  "use strict";

  ENGINE.namespace('ENGINE.MAP');

  ENGINE.MAP = (function() {

    this.Map = Map;

    return this;

    function Map(size) {
      this.size = size;
      this.wallGrid = new Uint8Array(size * size);
    }

  }).call(ENGINE.MAP);

})();
