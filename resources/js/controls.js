"use strict";
/// <reference path="virtualkeys.ts" />
var Controls = (function () {
    function Controls() {
        this.codes = {
            'mouseLeft': 'turnLeft',
            'mouseRight': 'turnRight'
        };
        this.codes[65 /* VK_A */] = 'left';
        this.codes[68 /* VK_D */] = 'right';
        this.codes[87 /* VK_W */] = 'forward';
        this.codes[83 /* VK_S */] = 'backward';
        this.codes[37 /* VK_LEFT */] = 'turnLeft';
        this.codes[39 /* VK_RIGHT */] = 'turnRight';
        this.states = {
            'left': false,
            'right': false,
            'forward': false,
            'backward': false,
            'turnLeft': false,
            'turnRight': false
        };
        document.addEventListener('keydown', this.onKey.bind(this, true), false);
        document.addEventListener('keyup', this.onKey.bind(this, false), false);
        document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        //document.body.onclick = document.body.requestPointerLock ||
        //    document.body.mozRequestPointerLock ||
        //    document.body.webkitRequestPointerLock;
    }
    Controls.prototype.onKey = function (val, e) {
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
    };
    Controls.prototype.onMouseMove = function (e) {
        var leftState = this.codes.mouseLeft;
        var rightState = this.codes.mouseRight;
        var x = (e.movementX || e.mozMovementX || e.webkitMovementX || 0);
        if (x > 0) {
            this.states[rightState] = true;
        }
        else if (x < 0) {
            this.states[leftState] = true;
        }
        var that = this;
        setTimeout(function () {
            that.onMouseMoveEnd(e);
        }, 10);
    };
    Controls.prototype.onMouseMoveEnd = function (e) {
        this.states.turnLeft = false;
        this.states.turnRight = false;
        if (e.preventDefault) {
            e.preventDefault();
        }
        if (e.stopPropagation) {
            e.stopPropagation();
        }
    };
    return Controls;
})();
