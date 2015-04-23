"use strict";

module Engine.Player {

  import States = Engine.Controls.States;
  import GameMap = Engine.GameMap.GameMap;

  export class Player implements Entity {

    private static CIRCLE: number = Math.PI * 2;
    private static MOVEMENT_SPEED: number = 2.4;
    private static ROTATE_SPEED: number = 0.7;

    x: number;
    y: number;
    direction: number;

    constructor(x: number, y: number, direction: number) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }

    rotate(angle: number): void {
      this.direction = (this.direction + angle + Player.CIRCLE) % (Player.CIRCLE);
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

    update(states: States, map: GameMap, seconds: number): void {// Figure out controls' type
      if (states['left']) {
        this.walk(Player.MOVEMENT_SPEED * seconds, map, (Player.CIRCLE * 3 / 4));
      }
      if (states['right']) {
        this.walk(Player.MOVEMENT_SPEED * seconds, map, (Player.CIRCLE / 4));
      }
      if (states['forward']) {
        this.walk(Player.MOVEMENT_SPEED * seconds, map, 0);
      }
      if (states['backward']) {
        this.walk(Player.MOVEMENT_SPEED * seconds, map, (Player.CIRCLE / 2));
      }
      if (states['turnLeft']) {
        this.rotate(-1 * Player.ROTATE_SPEED * Math.PI * seconds);
      }
      if (states['turnRight']) {
        this.rotate(Player.ROTATE_SPEED * Math.PI * seconds);
      }
    }
  }
}
