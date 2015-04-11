(function() {
  "use strict";

  var Player = ENGINE.PLAYER.Player;
  var Map = ENGINE.MAP.Map;

  var player1 = new Player(0, 2, 3.4);
  var player2 = new Player(1, 43, 65.4);

  var map = new Map(23);

  console.log(player1);
  console.log(player2);
  console.log(map);
})();
