(function(global) {

  var ENGINE = (function() {

    this.namespace = namespace;

    return this;

    // ENGINE.namespace taken from YUI.namespace
    function namespace() {
      var a = arguments;
      var o = null;
      var i, j, d;

      for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split('.');
        o = ENGINE;

        // ENGINE is implied, so it is ignored if it is included
        for (j = (d[0] == 'ENGINE') ? 1 : 0; j < d.length; j = j + 1) {
          o[d[j]] = o[d[j]] || {};
          o = o[d[j]];
        }
      }

      return o;
    }

  }).call(ENGINE || {});

  global.ENGINE = ENGINE;
})(this);
