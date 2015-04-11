(function() {
  "use strict";

  ENGINE.namespace('ENGINE.MAP');

  ENGINE.MAP = (function(module) {

    module.Map = Map;

    return module;

    function Map(size) {
      this.size = size;
      this.wallGrid = new Uint8Array(size * size);
    }

  })(ENGINE.MAP);

})();
