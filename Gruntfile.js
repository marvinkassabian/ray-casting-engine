module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    uglify: {
      my_target : {
        options : {
          sourceMap : true,
          sourceMapName : 'resources/js/raycaster.min.js.map'
        },
        files : {
          'resources/js/raycaster.min.js' : [
            'resources/js/engine.js',
            'resources/js/player.js',
            'resources/js/controls.js',
            'resources/js/bitmap.js',
            'resources/js/map.js',
            'resources/js/camera.js',
            'resources/js/gameloop.js',
            'resources/js/main.js']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
