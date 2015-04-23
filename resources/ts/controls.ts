"use strict";

module Engine.Controls {

  import VirtualKey = Engine.VirtualKey.VirtualKey;

  export interface Inputs {
    [input: string]: string;
  }

  export interface States {
    [state: string]: boolean;
  }

  export class Controls {

    inputs: Inputs;
    states: States;

    constructor() {
      this.inputs = {};
      //this.inputs['mouseLeft'] = 'turnLeft';
      //this.inputs['mouseRight'] = 'turnRight';
      this.inputs[VirtualKey.VK_A] = 'left';
      this.inputs[VirtualKey.VK_D] = 'right';
      this.inputs[VirtualKey.VK_W] = 'forward';
      this.inputs[VirtualKey.VK_S] = 'backward';
      this.inputs[VirtualKey.VK_LEFT] = 'turnLeft';
      this.inputs[VirtualKey.VK_RIGHT] = 'turnRight';
      this.inputs[VirtualKey.VK_C] = 'crouching';
      this.states = {
        'left': false,
        'right': false,
        'forward': false,
        'backward': false,
        'turnLeft': false,
        'turnRight': false,
        'crouching': false
      };
      document.addEventListener('keydown',
          this.onKey.bind(this, true), false);
      document.addEventListener('keyup',
          this.onKey.bind(this, false), false);
      document.addEventListener('mousemove',
          this.onMouseMove.bind(this), false);
      //document.body.onclick = document.body.requestPointerLock
      //    || document.body.mozRequestPointerLock
      //    || document.body.webkitRequestPointerLock;
    }

    onKey(val: boolean, e: KeyboardEvent): void {
      var state = this.inputs[e.keyCode];
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

    onMouseMove(e: MouseEvent) {
      var leftState = this.inputs['mouseLeft'];
      var rightState = this.inputs['mouseRight'];
      var x = (e.movementX || e.mozMovementX || e.webkitMovementX || 0);
      if (x > 0) {
        this.states[rightState] = true;
      } else if (x < 0) {
        this.states[leftState] = true;
      }

      setTimeout(() => {
        this.onMouseMoveEnd(e);
      }, 10);
    }

    onMouseMoveEnd(e: MouseEvent) {
      var leftState = this.inputs['mouseLeft'];
      var rightState = this.inputs['mouseRight'];
      this.states[leftState] = false;
      this.states[rightState] = false;
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
    }
  }
}
