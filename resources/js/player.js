ENGINE.namespace('ENGINE.PLAYER');

(function(global) {

  ENGINE.PLAYER = (function() {

    var hidden = '23';

    this.Player = Player;

    return this;

    function Player(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }

  }).call(ENGINE.PLAYER);

})(this);
