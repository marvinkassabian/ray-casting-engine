"use strict";

/// <reference path="player.ts" />
/// <reference path="map.ts" />
/// <reference path="controls.ts" />
/// <reference path="camera.ts" />
/// <reference path="loop.ts" />

var display: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('display');
var player: GamePlayer = new GamePlayer(15.3, -1.2, Math.PI * 0.3);
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
