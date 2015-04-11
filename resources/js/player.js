(function() {
  "use strict";

  ENGINE.namespace('ENGINE.PLAYER');

  ENGINE.PLAYER = (function(module) {

    module.Player = Player;

    return module;

    function Player(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }

  })(ENGINE.PLAYER);

})();
