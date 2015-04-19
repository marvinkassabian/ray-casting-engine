(function(global) {
  "use strict";

  var ENGINE = (function() {

    var CIRCLE = Math.PI * 2;

    // namespace taken from YUI
    function namespace() {
      var a = arguments;
      var o = null;
      var i, j, d;

      for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split('.');
        o = ENGINE;

        // ENGINE is implied, so it is ignored if it is included
        for (j = ((d[0] === 'ENGINE') ? 1 : 0); j < d.length; j++) {
          o[d[j]] = o[d[j]] || {};
          o = o[d[j]];
        }
      }

      return o;
    }

    this.CIRCLE = CIRCLE;
    this.namespace = namespace;

    return this;

  }).call(ENGINE || {});

  global.ENGINE = ENGINE;
})(this);
