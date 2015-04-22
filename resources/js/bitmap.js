"use strict";
var Bitmap = (function () {
    function Bitmap(src, width, height) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
    }
    return Bitmap;
})();
