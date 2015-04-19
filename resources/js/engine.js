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

    // has taken from Underscore
    var has = function(obj, key) {
      return obj != null && hasOwnProperty.call(obj, key);
    };

    // memoize taken from Underscore
    var memoize = function(func, hasher) {
      var memoize = function(key) {
        var cache = memoize.cache;
        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
        if (!has(cache, address)) {
          cache[address] = func.apply(this, arguments);
        }
        return cache[address];
      };
      memoize.cache = {};
      return memoize;
    };

    var atan2 = memoize(function(x, y) {
      return Math.atan2(x, y);
    });

    var cos = memoize(function(x) {
      return Math.cos(x);
    });

    var sin = memoize(function(x) {
      return Math.sin(x);
    });

    this.CIRCLE = CIRCLE;
    this.namespace = namespace;
    this.atan2 = atan2;
    this.cos = cos;
    this.sin = sin;

    return this;

  }).call(ENGINE || {});

  global.ENGINE = ENGINE;
})(this);
