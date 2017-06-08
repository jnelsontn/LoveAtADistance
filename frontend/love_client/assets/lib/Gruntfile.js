module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        predef: [ 'document', 'console', 'window', '$scope'],
        esnext: true,
        globalstrict: true,
        globals: { 'angular': true, 'app': true }
      },
      files: ['../../app/**/*.js']
    },
    copy: {
        angular: {
            expand: true,
            cwd: 'node_modules/angular',
            src: ['angular.min.js', 'angular.min.js.map'],
            dest: '../../dist/js/angular'
        },
        ui_router: {
            expand: true,
            cwd: 'node_modules/@uirouter/angularjs/release',
            src: ['angular-ui-router.min.js', 'angular-ui-router.min.js.map'],
            dest: '../../dist/js/ui-router'
        },
        angular_animate: {
            expand: true,
            cwd: 'node_modules/angular-animate',
            src: ['angular-animate.min.js', 'angular-animate.min.js.map'],
            dest: '../../dist/js/angular-animate'
        },
        angular_ui_bootstrap: {
            expand: true,
            cwd: 'node_modules/angular-ui-bootstrap/dist',
            src: ['ui-bootstrap-tpls.js'],
            dest: '../../dist/js/angular-ui-bootstrap'
        },
        bootstrap: {
            expand: true,
            cwd: 'node_modules/bootstrap/dist/css',
            src: ['bootstrap.min.css', 'bootstrap.min.css.map'],
            dest: '../../dist/css/bootstrap'
        }
    },
    watch: {
      javascripts: {
        files: ['../../app/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['copy', 'jshint', 'watch']);
};
