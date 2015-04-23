"use strict";

module Engine.Player {

  import States = Engine.Controls.States;
  import GameMap = Engine.GameMap.GameMap;

  var CIRCLE: number = Math.PI * 2;
  var MOVEMENT_SPEED: number = 2.4;
  var ROTATE_SPEED: number = 0.7;
  var CROUCH_SPEED: number = 2;
  var DEFAULT_HEIGHT: number = 1;
  var MAX_CROUCH_MOD: number = 0;
  var MIN_CROUCH_MOD: number = -0.15;

  export class Player implements Entity {

    x: number;
    y: number;
    direction: number;
    playerHeight: number;
    crouchModifier: number;

    constructor(x: number, y: number, direction: number,
        height: number = DEFAULT_HEIGHT) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.playerHeight = height;
      this.crouchModifier = 0;
    }

    rotate(angle: number): void {
      this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
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

    changeCrouchModifier(delta: number): void {
      var heightModifier = Math.max(this.crouchModifier + delta, MIN_CROUCH_MOD);
      this.crouchModifier = Math.min(heightModifier, MAX_CROUCH_MOD);
    }

    update(states: States, map: GameMap, seconds: number): void {
      if (states['left']) {
        this.walk(MOVEMENT_SPEED * seconds, map, (CIRCLE * 3 / 4));
      }
      if (states['right']) {
        this.walk(MOVEMENT_SPEED * seconds, map, (CIRCLE / 4));
      }
      if (states['forward']) {
        this.walk(MOVEMENT_SPEED * seconds, map, 0);
      }
      if (states['backward']) {
        this.walk(MOVEMENT_SPEED * seconds, map, (CIRCLE / 2));
      }
      if (states['turnLeft']) {
        this.rotate(-1 * ROTATE_SPEED * Math.PI * seconds);
      }
      if (states['turnRight']) {
        this.rotate(ROTATE_SPEED * Math.PI * seconds);
      }
      if (states['crouching']) {
        this.changeCrouchModifier(-1 * CROUCH_SPEED * seconds);
      } else {
        this.changeCrouchModifier(CROUCH_SPEED * seconds);
      }
    }

    getHeight(): number {
      return this.playerHeight + this.crouchModifier;
    }
  }
}
