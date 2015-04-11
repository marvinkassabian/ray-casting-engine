(function() {
  "use strict";

  ENGINE.namespace('ENGINE.PLAYER');

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
