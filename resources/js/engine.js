var Engine = (function(Engine) {

  Engine.Player = function(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  };

  Engine.Map = function(size) {
    this.size = size;
    this.wallGrid = new Uint8Array(size * size);
  };

  return Engine;

}(Engine || {}));
