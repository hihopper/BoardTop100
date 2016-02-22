module.exports = function(grunt) {
  [
    'grunt-contrib-jshint',
    'grunt-express-server',
    'grunt-contrib-watch',
    'grunt-wiredep',
    'grunt-contrib-copy',
    'grunt-contrib-clean'
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  grunt.initConfig({
    // Project settings
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      server: {
        options: {
          jshintrc: 'server/.jshintrc'
        },
        src: [
          'server/**/*.js',
          '!server/**/*.spec.js'
        ]
      }
    },

    express: {
      options: {

      },
      dev: {
        options: {
//          script: 'server/app_cluster.js',
          script: 'server/app.js',
          debug: true,
          //node_env: 'production',
          //node_env: 'heroku',
          port: 4000
        }
      }
    },

    watch: {
      express: {
        files: [
          'server/**/*.{js,json,handlebars}'
        ],
        tasks: ['express:dev'],
        options: {
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/*',
            '!dist/.git*',
            '!dist/.openshift',
            '!dist/Procfile',
            '!dist/public/fonts'
          ]
        }]
      },
      server: '.tmp'
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dest: 'dist',
          src: [
            'package.json',
            'server/**/*'
          ]
        }, {
          expand: true,
          cwd: 'client/bower_components/bootstrap-css-only/fonts',
          dest: 'dist/public/fonts',
          src: [
            '*'
          ]
        }]
      }
    },
  });

  grunt.registerTask('default', ['jshint', 'express', 'watch']);

  grunt.registerTask('build', [
      'clean:dist',
      'copy:dist'
    ]);
};
