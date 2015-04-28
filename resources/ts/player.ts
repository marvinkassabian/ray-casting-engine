"use strict";

module Engine.Player {

  import States = Engine.Controls.States;
  import GameMap = Engine.GameMap.GameMap;
  import Util = Engine.Util;

  var MOVEMENT_SPEED: number = 2.4;
  var HORIZONTAL_VIEW_SPEED: number = 1.2;
  var VERTICAL_VIEW_SPEED: number = 1000;
  var CROUCH_SPEED: number = 500;
  var JUMP_HEIGHT: number = 50;
  var JUMP_SPEED: number = 2;
  var DEFAULT_HEIGHT: number = 1;
  //Modularize
  var MAX_CROUCH_MOD: number = 0;
  var MIN_CROUCH_MOD: number = -50;
  var MAX_JUMP_MOD: number = 1000;
  var MIN_JUMP_MOD: number = 0;
  var MAX_VIEW_MOD: number = 1000;
  var MIN_VIEW_MOD: number = -1000;

  enum Direction {
    FORWARD = 1,
    RIGHT = 2,
    BACKWARD = 4,
    LEFT = 8
  }

  var DIRECTION_STATE_TABLE = {};
  DIRECTION_STATE_TABLE[Direction.LEFT] = 'left';
  DIRECTION_STATE_TABLE[Direction.RIGHT] = 'right';
  DIRECTION_STATE_TABLE[Direction.FORWARD] = 'forward';
  DIRECTION_STATE_TABLE[Direction.BACKWARD] = 'backward';

  var DIRECTION_TABLE = {
    0: Infinity,
    1: (0 / 8) * Util.CIRCLE,
    2: (2 / 8) * Util.CIRCLE,
    3: (1 / 8) * Util.CIRCLE,
    4: (4 / 8) * Util.CIRCLE,
    5: Infinity,
    6: (3 / 8) * Util.CIRCLE,
    7: (2 / 8) * Util.CIRCLE,
    8: (6 / 8) * Util.CIRCLE,
    9: (7 / 8) * Util.CIRCLE,
    10: Infinity,
    11: (0 / 8) * Util.CIRCLE,
    12: (5 / 8) * Util.CIRCLE,
    13: (6 / 8) * Util.CIRCLE,
    14: (4 / 8) * Util.CIRCLE,
    15: Infinity
  };

  export class Player implements Entity {

    x: number;
    y: number;
    direction: number;
    playerHeight: number;
    crouchModifier: number;
    jumpModifier: number;
    viewModifier: number;
    jumping: boolean;
    moveWhileJumping; boolean;
    jumpDirection: number;
    verticalVelocity: number;

    constructor(x: number, y: number, direction: number,
        height: number = DEFAULT_HEIGHT) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.playerHeight = height;
      this.crouchModifier = 0;
      this.jumpModifier = 0;
      this.viewModifier = 0;
      this.verticalVelocity = 0;
      this.moveWhileJumping = false;
    }

    private rotate(angle: number): void {
      this.direction = (this.direction + angle + Util.CIRCLE) % (Util.CIRCLE);
    }

    private walk(distance: number, map: GameMap, direction: number): void {
      this.move(distance ,map, this.direction + direction);
    }

    private move(distance: number, map: GameMap, direction: number): void {
      var dx: number = Math.cos(direction) * distance;
      var dy: number = Math.sin(direction) * distance;

      if (map.get(this.x + dx, this.y) <= 0) {
        this.x += dx;
      }
      if (map.get(this.x, this.y + dy) <= 0) {
        this.y += dy;
      }
    }

    //Modularize these methods
    private changeCrouchModifier(delta: number): void {
      this.crouchModifier = Util.clamp(this.crouchModifier + delta, MIN_CROUCH_MOD, MAX_CROUCH_MOD);
    }

    private changeJumpModifier(delta: number): void {
      this.jumpModifier = Util.clamp(this.jumpModifier + delta, MIN_JUMP_MOD, MAX_JUMP_MOD);
    }

    private changeViewModifier(delta: number) {
      this.viewModifier = Util.clamp(this.viewModifier + delta, MIN_VIEW_MOD, MAX_VIEW_MOD);
    }

    update(states: States, map: GameMap, timestep: number): void {
      var jumpDirection: number = 0;
      var moveWhileJumping = false;

      for (var direction in Direction) {
        if (states[DIRECTION_STATE_TABLE[direction]] && this.onGround()) {
          this.walk(MOVEMENT_SPEED * timestep, map, DIRECTION_TABLE[direction]);
          moveWhileJumping = true;
          jumpDirection += +direction;
        }
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
        if (this.onGround()) {
          this.verticalVelocity = 5;
          console.log(jumpDirection);
          console.log(typeof jumpDirection);
          jumpDirection = DIRECTION_TABLE[jumpDirection];
          this.jumpDirection = jumpDirection + this.direction;
          this.moveWhileJumping =
              (jumpDirection !== Infinity)
              ? moveWhileJumping
              : false;
        }
      }

      if (!this.onGround()) {
        if (this.moveWhileJumping) {
          this.move(JUMP_SPEED * timestep, map, this.jumpDirection);
        }
      }

      this.verticalVelocity -= timestep * 15;
      this.changeJumpModifier(JUMP_HEIGHT * timestep * this.verticalVelocity);
    }

    getHeightInformation(): RenderingInformation {
      return {
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
