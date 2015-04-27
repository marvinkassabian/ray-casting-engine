"use strict";

module Engine.Main {

  import Camera = Engine.Camera.Camera;
  import Controls = Engine.Controls.Controls;
  import GameLoop = Engine.GameLoop.GameLoop;
  import GameMap = Engine.GameMap.GameMap;
  import Player = Engine.Player.Player;

  export function exec(): void {
    var display: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('display');
    var player: Player = new Player(15.3, -1.2, Math.PI * 0.3, 1);
    var map: GameMap = new GameMap(32);
    var controls: Controls = new Controls();
    var camera: Camera = new Camera(display, 240, 0.6);
    var loop: GameLoop = new GameLoop();

    map.randomize();

    loop.start(function updateCallback(timestep) {
      player.update(controls.states, map, timestep);
    }, function renderCallback() {
      camera.render(player, map);
    });
  }
}

Engine.Main.exec();
