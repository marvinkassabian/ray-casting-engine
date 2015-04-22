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
            'resources/js/virtualkeys.js',
            'resources/js/player.js',
            'resources/js/controls.js',
            'resources/js/bitmap.js',
            'resources/js/map.js',
            'resources/js/camera.js',
            'resources/js/gameloop.js',
            'resources/js/main.js']
        }
      }
    },
    typescript: {
      base: {
        src: ['resources/ts/*.ts'],
        dest: 'resources/js',
        options: {
          module: 'amd',
          target: 'es5',
          basePath: 'resources/ts',
          sourceMap: false,
          declaration: false
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-typescript');

  // Default task(s).
  grunt.registerTask('default', ['ts', 'min']);
  grunt.registerTask('min', ['uglify']);
  grunt.registerTask('ts', ['typescript']);

};
