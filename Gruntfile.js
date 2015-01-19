'use strict';
module.exports = function(grunt) {

  // Load modules
    require('load-grunt-tasks')(grunt);

  var o = {
      port : 9000
  };

  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    // Project configuration
    p: {
        currProj: '',
        src:    '<%= p.currProj %>dev',
        css:    '<%= p.src %>/css/',
        js:     '<%= p.src %>/js/',
        img:    '<%= p.src %>/img/',
        dest:   '<%= p.currProj %>/dist',
        _css:    '<%= p.dest %>/css/',
        _js:     '<%= p.dest %>/js/',
        _img:    '<%= p.dest %>/img/',
        browser: 'chrome'
    },

    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %>*/\n',

    concat: {
        options: {
          separator: ';'
        },

        dist: {} // configuration overiden by usemin
    },

    uglify: {
        options: {
          banner: '<%= banner %>'
        },

        dist: {} // configuration overiden by usemin
    },

    htmlmin: {

      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: {                                
          '<%= p.dest %>/index.html': '<%= p.dest %>/index.html',     
        }
      }

    },

    compass: {
      dev: {
        options: {
            httpPath: '/',
            basePath: '',
            cssDir: '<%= p.css %>',
            sassDir: '<%= p.css %>sass',
            imagesDir: '<%= p.img %>',
            javascriptsDir: '<%= p.js %>',
            fontsDir: '<%= p.css %>fonts',
            outputStyle: 'nested', // compressed , nested, expanded
            environment: 'development', // production, development
            relativeAssets: false,
            noLineComments: false
        }
      },
      dist: {
        options: {
            httpPath: '/',
            basePath: '',
            cssDir: '<%= p._css %>',
            sassDir: '<%= p._css %>sass',
            imagesDir: '<%= p._img %>',
            javascriptsDir: '<%= p._js %>',
            fontsDir: '<%= p._css %>fonts',
            outputStyle: 'compressed', // compressed , nested, expanded
            environment: 'production', // production, development
            relativeAssets: false,
            noLineComments: false
        }
      }
    },

    // Copy index for usemin
    copy: {
      main: {
        src: '<%= p.src %>/index.html', 
        dest: '<%= p.dest %>/index.html'
      }
    },
    
    // Empties destination folder to start fresh
    clean: {
      build: ['<%= p.dest %>/*']
    },

    /// userminPrepare 
    useminPrepare: {
        html: '<%= p.src %>/index.html',
        options: {
            dest: '<%= p.dest %>',
        }
    },

    // Usemin build
    usemin: {
        html: ['<%= p.dest %>/index.html']
    },

    // Watch files for changes
    watch: {
      js: {
        files: ['<%= p.js %>{,*/}*.js'],
        options: {
          livereload: true,
        }
      },
      compass: {
        files: ['<%= p.css %>sass/{,*/}*.scss'],
        //tasks: ['sass:dev'],
        tasks: ['compass:dev'],
        options: {
          livereload: true,
        }
      },
      html: {
        files: ['<%= p.src %>/{,*/}*.html'],
        options: {
          livereload: true,
        }
      },

      // Images

      gruntfile: {
        files: ['Gruntfile.js']
      }

    },

    // Gruint server serttings
    connect: {
      server : {
        options:{
          port: o.port,
          open: {
              target: 'http://localhost:<%= connect.server.options.port%>/<%= p.src %>',
              appName: '<%= p.browser %>'
          },
          livereload: true
        }        
      }
    }

  });

  // Register tasks
  grunt.registerTask('serve', function() {

    //grunt.log.warn('error'); // samplle warn log
    grunt.log.ok('Serving at port ' + o.port);
    grunt.task.run([
      'connect',
      'watch'
      ]);
  });

  // Build for production
  grunt.registerTask('build', [ 
    'clean:build',
    'copy:main',
    'useminPrepare',
    'concat',
    'uglify',
    'compass:dist',
    'usemin',
    'htmlmin'
    ]);

 
};
