"use strict";
/// <reference path="player.ts" />
/// <reference path="map.ts" />
/// <reference path="controls.ts" />
/// <reference path="camera.ts" />
/// <reference path="loop.ts" />
var display = document.getElementById('display');
var player = new GamePlayer(15.3, -1.2, Math.PI * 0.3);
var map = new GameMap(32);
var controls = new Controls();
var camera = new Camera(display, 240, 0.6);
var loop = new GameLoop();
map.randomize();
loop.start(function updateCallback(timestep) {
    player.update(controls.states, map, timestep);
}, function renderCallback() {
    camera.render(player, map);
});
