(function() {
  "use strict";

  var Player = ENGINE.PLAYER.Player;
  var Map = ENGINE.MAP.Map;
  var Controls = ENGINE.CONTROLS.Controls;
  var Camera = ENGINE.CAMERA.Camera;
  var GameLoop = ENGINE.GAMELOOP.GameLoop;

  var display = document.getElementById('display');
  var player = new Player(15.3, -1.2, Math.PI * 0.3);
  var map = new Map(32);
  var controls = new Controls();
  var camera = new Camera(display, 240, 0.6);
  var loop = new GameLoop();

  map.randomize();

  loop.start(function updateCallback(timestep) {
    map.update(timestep);
    player.update(controls.states, map, timestep);
  }, function renderCallback() {
    camera.render(player, map);
  });

})();
