(function() { //TODO: change controls to modern shooters
  "use strict";

  ENGINE.namespace('ENGINE.PLAYER');

  ENGINE.PLAYER = (function(module) {

    var CIRCLE = ENGINE.CIRCLE;

    function Player(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }

    Player.prototype.rotate = function(angle) {
      this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
    };

    Player.prototype.walk = function(distance, map) {
      var dx = Math.cos(this.direction) * distance;
      var dy = Math.sin(this.direction) * distance;

      if (map.get(this.x + dx, this.y) <= 0) {
        this.x += dx;
      }
      if (map.get(this.x, this.y + dy) <= 0) {
        this.y += dy;
      }
    };

    Player.prototype.update = function(controls, map, seconds) {
      if (controls.left) {
        this.rotate(-Math.PI * seconds);
      }
      if (controls.right) {
        this.rotate(Math.PI * seconds);
      }
      if (controls.forward) {
        this.walk(3 * seconds, map); //TODO: magic number
      }
      if (controls.backward) {
        this.walk(-3 * seconds, map); //TODO: magic number
      }
    };

    module.Player = Player;

    return module;

  })(ENGINE.PLAYER);

})();
