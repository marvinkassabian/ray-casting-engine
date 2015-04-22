"use strict";

/// <reference path="virtualkeys.ts" />

class Controls {

  codes;
  states;

  constructor() {
    this.codes  = {
      'mouseLeft': 'turnLeft',
      'mouseRight': 'turnRight'
    };

    this.codes[virtualKeys.VK_A] = 'left';
    this.codes[virtualKeys.VK_D] = 'right';
    this.codes[virtualKeys.VK_W] = 'forward';
    this.codes[virtualKeys.VK_S] = 'backward';
    this.codes[virtualKeys.VK_LEFT] = 'turnLeft';
    this.codes[virtualKeys.VK_RIGHT] = 'turnRight';
    this.states = {
      'left': false,
      'right': false,
      'forward': false,
      'backward': false,
      'turnLeft': false,
      'turnRight': false
    };
    document.addEventListener('keydown',
        this.onKey.bind(this, true), false);
    document.addEventListener('keyup',
        this.onKey.bind(this, false), false);
    document.addEventListener('mousemove',
        this.onMouseMove.bind(this), false);
    //document.body.onclick = document.body.requestPointerLock ||
    //    document.body.mozRequestPointerLock ||
    //    document.body.webkitRequestPointerLock;
  }

  onKey(val, e) {
    var state = this.codes[e.keyCode];
    if (typeof state === 'undefined') {
      return;
    }
    this.states[state] = val;
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  }

  onMouseMove(e) {
    var leftState = this.codes.mouseLeft;
    var rightState = this.codes.mouseRight;
    var x = (e.movementX || e.mozMovementX || e.webkitMovementX || 0);
    if (x > 0) {
      this.states[rightState] = true;
    } else if (x < 0) {
      this.states[leftState] = true;
    }

    var that = this;
    setTimeout(function() {
      that.onMouseMoveEnd(e);
    }, 10);
  }

  onMouseMoveEnd(e) {
    this.states.turnLeft = false;
    this.states.turnRight = false;
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  }
}
