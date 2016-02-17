module.exports = function(grunt) {
  [
    'grunt-contrib-jshint',
    'grunt-express-server',
    'grunt-contrib-watch',
    'grunt-wiredep',
    'grunt-injector',
    'grunt-contrib-clean',
    'grunt-concurrent',
    'grunt-svgmin',
    'grunt-contrib-imagemin',
    'grunt-autoprefixer',
    'grunt-angular-templates',
    'grunt-ng-annotate',
    'grunt-contrib-copy',
    'grunt-google-cdn',
    'grunt-usemin',
    'grunt-contrib-concat',
    'grunt-contrib-uglify',
    'grunt-contrib-cssmin',
    'grunt-filerev',
    'grunt-rev'
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  grunt.initConfig({
    // Project settings
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      client: {
        options: {
          jshintrc: 'client/.jshintrc'
        },
        src: [
          'client/{app,components}/**/*.js',
          '!client/{app,components}/**/*.spec.js'
        ]
      },
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
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev'],
        options: {
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: 'client/index.html',
        ignorePath: 'client/',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/']
      }
    },

    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          'client/index.html': [
               [
                 '{.tmp,client}/{app,components}/**/*.js',
                 '!{.tmp,client}/app/app.js',
                 '!{.tmp,client}/{app,components}/**/*.spec.js',
                 '!{.tmp,client}/{app,components}/**/*.mock.js'
               ]
            ]
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          'client/index.html': [
            'client/{app,components}/**/*.css'
          ]
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

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },
    // Renames files for browser caching purposes
      rev: {
        dist: {
          files: {
            src: [
              'dist/public/app/*.js',
              //'dist/public/{,*/}*.js',
              'dist/public/{,*/}*.css',
              'dist/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
              'dist/public/assets/fonts/*'
            ]
          }
        }
      },

      // Reads HTML for usemin blocks to enable smart builds that automatically
      // concat, minify and revision files. Creates configurations in memory so
      // additional tasks can operate on them
      useminPrepare: {
        html: ['client/index.html'],
        options: {
          dest: 'dist/public'
        }
      },

      // Performs rewrites based on rev and the useminPrepare configuration
      usemin: {
        html: ['dist/public/{,*/}*.html'],
        css: ['dist/public/{,*/}*.css'],
        js: ['dist/public/{,*/}*.js'],
        options: {
          assetsDirs: [
            'dist/public',
            'dist/public/assets/images'
          ],
          // This is so we update image references in our ng-templates
          patterns: {
            js: [
              [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
            ]
          }
        }
      },

      // The following *-min tasks produce minified files in the dist folder
      imagemin: {
        dist: {
          files: [{
            expand: true,
            cwd: 'client/assets/images',
            src: '{,*/}*.{png,jpg,jpeg,gif}',
            dest: 'dist/public/assets/images'
          }]
        }
      },

      svgmin: {
        dist: {
          files: [{
            expand: true,
            cwd: 'client/assets/images',
            src: '{,*/}*.svg',
            dest: 'dist/public/assets/images'
          }]
        }
      },

      // Allow the use of non-minsafe AngularJS files. Automatically makes it
      // minsafe compatible so Uglify does not destroy the ng references
      ngAnnotate: {
        dist: {
          files: [{
            expand: true,
            cwd: '.tmp/concat',
            src: '**/*.js',
            dest: '.tmp/concat'
          }]
        }
      },

      // Package all the html partials into a single javascript payload
      ngtemplates: {
        options: {
          // This should be the name of your apps angular module
          module: 'smsApp',
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
          usemin: 'app/app.js'
        },
        main: {
          cwd: 'client',
          src: ['{app,components}/**/*.html'],
          dest: '.tmp/templates.js'
        },
        tmp: {
          cwd: '.tmp',
          src: ['{app,components}/**/*.html'],
          dest: '.tmp/tmp-templates.js'
        }
      },

      // Replace Google CDN references
      cdnify: {
        dist: {
          html: ['dist/public/*.html']
        }
      },

      // Copies remaining files to places other tasks can use
      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: 'client',
            dest: 'dist/public',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              'bower_components/**/*',
              'assets/images/{,*/}*.{webp}',
              'assets/fonts/**/*',
              'index.html'
            ]
          }, {
            expand: true,
            cwd: '.tmp/images',
            dest: 'dist/public/assets/images',
            src: ['generated/*']
          }, {
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
        },
        styles: {
          expand: true,
          cwd: 'client',
          dest: '.tmp/',
          src: ['{app,components}/**/*.css']
        }
      },

      // Run some tasks in parallel to speed up the build process
      concurrent: {
        server: [
        ],
        test: [
        ],
        debug: {
          tasks: [
            'nodemon',
            'node-inspector'
          ],
          options: {
            logConcurrentOutput: true
          }
        },
        dist: [
          'imagemin',
          'svgmin'
        ]
      },


  });

  grunt.registerTask('default', ['jshint', 'injector', 'wiredep', 'express', 'watch']);

  grunt.registerTask('build', [
      'clean:dist',
      'concurrent:dist',
      'injector',
      'wiredep',
      'useminPrepare',
      'autoprefixer',
      'ngtemplates',
      'concat',
      'ngAnnotate',
      'copy:dist',
      'cdnify',
      'cssmin',
      'uglify',
      'rev',
      'usemin'
    ]);
};
