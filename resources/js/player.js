(function() {
  "use strict";

  ENGINE.namespace('ENGINE.PLAYER');

  ENGINE.PLAYER = (function(module) {

    function Player(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }

    module.Player = Player;

    return module;

  })(ENGINE.PLAYER);

})();
