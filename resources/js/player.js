"use strict";
var GamePlayer = (function () {
    function GamePlayer(x, y, direction) {
        this.CIRCLE = Math.PI * 2;
        this.movementSpeed = 2.4;
        this.rotateSpeed = 0.7;
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
    GamePlayer.prototype.rotate = function (angle) {
        this.direction = (this.direction + angle + this.CIRCLE) % (this.CIRCLE);
    };
    GamePlayer.prototype.walk = function (distance, map, direction) {
        var dx = Math.cos(this.direction + direction) * distance;
        var dy = Math.sin(this.direction + direction) * distance;
        if (map.get(this.x + dx, this.y) <= 0) {
            this.x += dx;
        }
        if (map.get(this.x, this.y + dy) <= 0) {
            this.y += dy;
        }
    };
    GamePlayer.prototype.update = function (controls, map, seconds) {
        if (controls.left) {
            this.walk(this.movementSpeed * seconds, map, (this.CIRCLE * 3 / 4));
        }
        if (controls.right) {
            this.walk(this.movementSpeed * seconds, map, (this.CIRCLE / 4));
        }
        if (controls.forward) {
            this.walk(this.movementSpeed * seconds, map, 0);
        }
        if (controls.backward) {
            this.walk(this.movementSpeed * seconds, map, (this.CIRCLE / 2));
        }
        if (controls.turnLeft) {
            this.rotate(-1 * this.rotateSpeed * Math.PI * seconds);
        }
        if (controls.turnRight) {
            this.rotate(this.rotateSpeed * Math.PI * seconds);
        }
    };
    return GamePlayer;
})();
