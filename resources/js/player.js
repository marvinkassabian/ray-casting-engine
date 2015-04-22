"use strict";
/// <reference path="map.ts" />
/// <reference path="controls.ts" />
var GamePlayer = (function () {
    function GamePlayer(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
    GamePlayer.prototype.rotate = function (angle) {
        this.direction = (this.direction + angle + GamePlayer.CIRCLE) % (GamePlayer.CIRCLE);
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
    };
    GamePlayer.CIRCLE = Math.PI * 2;
    GamePlayer.movementSpeed = 2.4;
    GamePlayer.rotateSpeed = 0.7;
    return GamePlayer;
})();
