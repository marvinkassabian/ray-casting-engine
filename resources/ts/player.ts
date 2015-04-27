"use strict";

module Engine.Player {

  import States = Engine.Controls.States;
  import GameMap = Engine.GameMap.GameMap;
  import CIRCLE = Engine.Util.CIRCLE; //Change to import Util?
  import clamp = Engine.Util.clamp; //Change to import Util?

  var MOVEMENT_SPEED: number = 2.4;
  var HORIZONTAL_VIEW_SPEED: number = 1.2;
  var VERTICAL_VIEW_SPEED: number = 1000;
  var CROUCH_SPEED: number = 2;
  var DEFAULT_HEIGHT: number = 1;
  //Modularize
  var MAX_CROUCH_MOD: number = 0;
  var MIN_CROUCH_MOD: number = 0;
  var MAX_JUMP_MOD: number = 0;
  var MIN_JUMP_MOD: number = 0;
  var MAX_VIEW_MOD: number = 1000;
  var MIN_VIEW_MOD: number = -1000;

  export class Player implements Entity {

    x: number;
    y: number;
    direction: number;
    playerHeight: number;
    crouchModifier: number;
    jumpModifier: number;
    viewModifier: number;
    jumping: boolean;

    constructor(x: number, y: number, direction: number,
        height: number = DEFAULT_HEIGHT) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.playerHeight = height;
      this.crouchModifier = 0;
      this.jumpModifier = 0;
      this.viewModifier = 0;
      this.jumping = false;
    }

    private rotate(angle: number): void {
      this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
    }

    private walk(distance: number, map: GameMap, direction: number): void {
      var dx: number = Math.cos(this.direction + direction) * distance;
      var dy: number = Math.sin(this.direction + direction) * distance;

      if (map.get(this.x + dx, this.y) <= 0) {
        this.x += dx;
      }
      if (map.get(this.x, this.y + dy) <= 0) {
        this.y += dy;
      }
    }

    //Modularize these methods
    private changeCrouchModifier(delta: number): void {
      this.crouchModifier = clamp(this.crouchModifier + delta, MIN_CROUCH_MOD, MAX_CROUCH_MOD);
    }

    private changeJumpModifier(delta: number): void {
      this.jumpModifier = clamp(this.jumpModifier + delta, MIN_JUMP_MOD, MAX_JUMP_MOD);
    }

    private changeViewModifier(delta: number) {
      this.viewModifier = clamp(this.viewModifier + delta, MIN_VIEW_MOD, MAX_VIEW_MOD);
    }

    update(states: States, map: GameMap, timestep: number): void {
      console.log(1);
      if (states['left']) {
        this.walk(MOVEMENT_SPEED * timestep, map, (CIRCLE * 3 / 4));
      }
      if (states['right']) {
        this.walk(MOVEMENT_SPEED * timestep, map, (CIRCLE / 4));
      }
      if (states['forward']) {
        this.walk(MOVEMENT_SPEED * timestep, map, 0);
      }
      if (states['backward']) {
        this.walk(MOVEMENT_SPEED * timestep, map, (CIRCLE / 2));
      }
      if (states['turnLeft']) {
        this.rotate(-1 * HORIZONTAL_VIEW_SPEED * Math.PI * timestep);
      }
      if (states['turnRight']) {
        this.rotate(HORIZONTAL_VIEW_SPEED * Math.PI * timestep);
      }
      if (states['lookUp']) {
        this.changeViewModifier(VERTICAL_VIEW_SPEED * timestep);
      }
      if (states['lookDown']) {
        this.changeViewModifier(-1 * VERTICAL_VIEW_SPEED * timestep);
      }
      if (states['crouch']) {
        this.changeCrouchModifier(-1 * CROUCH_SPEED * timestep);
      } else {
        this.changeCrouchModifier(CROUCH_SPEED * timestep);
      }
      if (states['jump']) {
        this.changeJumpModifier(CROUCH_SPEED * timestep);
      } else {
        this.changeJumpModifier(-1 * CROUCH_SPEED * timestep);
      }
    }

    getHeightInformation(): RenderingInformation {
      return {
        height: this.playerHeight,
        crouchModifier: this.crouchModifier,
        jumpModifier: this.jumpModifier,
        viewModifier: this.viewModifier
      };
    }

    private onGround(): boolean {
      return this.jumpModifier === MIN_JUMP_MOD;
    }
  }
}
