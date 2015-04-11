ENGINE.namespace('ENGINE.PLAYER');

(function() {
  "use strict";

  ENGINE.PLAYER = (function() {

    this.Player = Player;

    return this;

    function Player(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }

  }).call(ENGINE.PLAYER);

})();
