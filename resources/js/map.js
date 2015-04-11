ENGINE.namespace('ENGINE.MAP');

(function(global) {

  ENGINE.MAP = (function() {

    var hidden = '24';

    this.Map = Map;

    return this;

    function Map(size) {
      this.size = size;
      this.wallGrid = new Uint8Array(size * size);
    }

  }).call(ENGINE.MAP);

})(this);
