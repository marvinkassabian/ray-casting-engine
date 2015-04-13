(function() { //TODO: change controls to modern shooters, sperate code
  "use strict";

  ENGINE.namespace('ENGINE.PLAYER');

  ENGINE.PLAYER = (function(module) {

    var CIRCLE = ENGINE.CIRCLE;
    var movementSpeed = 2.4;
    var rotateSpeed = 0.7;

    function Player(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }

    Player.prototype.rotate = function(angle) {
      this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
      console.log("direction: " + this.direction);
    };

    Player.prototype.walk = function(distance, map, direction) {
      var dx = Math.cos(this.direction + direction) * distance;
      var dy = Math.sin(this.direction + direction) * distance;

      if (map.get(this.x + dx, this.y) <= 0) {
        this.x += dx;
        console.log("x: " + this.x);
      }
      if (map.get(this.x, this.y + dy) <= 0) {
        this.y += dy;
        console.log("y: " + this.x);
      }
    };

    Player.prototype.update = function(controls, map, seconds) {
      if (controls.left) {
        this.walk(movementSpeed * seconds, map, (CIRCLE * 3 / 4));
      }
      if (controls.right) {
        this.walk(movementSpeed * seconds, map, (CIRCLE / 4));
      }
      if (controls.forward) {
        this.walk(movementSpeed * seconds, map, 0);
      }
      if (controls.backward) {
        this.walk(movementSpeed * seconds, map, (CIRCLE / 2));
      }
      if (controls.turnLeft) {
        this.rotate(-1 * rotateSpeed * Math.PI * seconds);
      }
      if (controls.turnRight) {
        this.rotate(rotateSpeed * Math.PI * seconds);
      }
    };

    module.Player = Player;

    return module;

  })(ENGINE.PLAYER);

})();
