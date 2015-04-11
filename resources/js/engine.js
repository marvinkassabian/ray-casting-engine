(function() {

  var Engine = (function() {

    this.Player = Player;
    this.Map = Map;

    return this;

    function Player(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }

    function Map(size) {
      this.size = size;
      this.wallGrid = new Uint8Array(size * size);
    }

  }).call(Engine || {});

  window.Engine = Engine;
})();
