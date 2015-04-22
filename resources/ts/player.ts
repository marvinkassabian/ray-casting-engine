"use strict";

/// <reference path="map.ts" />
/// <reference path="controls.ts" />

class GamePlayer {

  private static CIRCLE: number = Math.PI * 2;
  private static movementSpeed: number = 2.4;
  private static rotateSpeed: number = 0.7;

  x: number;
  y: number;
  direction: number;

  constructor(x: number, y: number, direction: number) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  rotate(angle: number): void {
    this.direction = (this.direction + angle + GamePlayer.CIRCLE) % (GamePlayer.CIRCLE);
  }

  walk(distance: number, map: GameMap, direction: number): void {
    var dx: number = Math.cos(this.direction + direction) * distance;
    var dy: number = Math.sin(this.direction + direction) * distance;

    if (map.get(this.x + dx, this.y) <= 0) {
      this.x += dx;
    }
    if (map.get(this.x, this.y + dy) <= 0) {
      this.y += dy;
    }
  }

  update(controls: States, map: GameMap, seconds: number): void {// Figure out controls' type
    if (controls['left']) {
      this.walk(GamePlayer.movementSpeed * seconds, map, (GamePlayer.CIRCLE * 3 / 4));
    }
    if (controls['right']) {
      this.walk(GamePlayer.movementSpeed * seconds, map, (GamePlayer.CIRCLE / 4));
    }
    if (controls['forward']) {
      this.walk(GamePlayer.movementSpeed * seconds, map, 0);
    }
    if (controls['backward']) {
      this.walk(GamePlayer.movementSpeed * seconds, map, (GamePlayer.CIRCLE / 2));
    }
    if (controls['turnLeft']) {
      this.rotate(-1 * GamePlayer.rotateSpeed * Math.PI * seconds);
    }
    if (controls['turnRight']) {
      this.rotate(GamePlayer.rotateSpeed * Math.PI * seconds);
    }
  }
}
