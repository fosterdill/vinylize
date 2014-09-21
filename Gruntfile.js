module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');

  // Project configuration.
  grunt.initConfig({
    pkg: pkg,
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/dev/<%= pkg.name %>.js',
        dest: 'build/prod/<%= pkg.name %>.min.js'
      }
    },
    requirejs: {
      main: {
        options: {
          include: ['src/vinylize'],
          insertRequire: ['src/vinylize'],
          out: 'build/dev/' + pkg.name + '.js'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          keepalive: true,
          base: '.'
        }
      }
    },
    compass: {                  // Task
      build: {                   // Target
        options: {              // Target options
          sassDir: 'src/scss',
          cssDir: 'build/dev'
        }
      }
    },
    copy: {
      css: {
        files: [
          {
            expand: true,
            cwd: 'build/dev',
            src: 'main.css',
            dest: "build/prod"
          }
        ]
      },
      html: {
        files: [
          {
            expand: true,
            cwd: '.',
            src: 'index.html',
            dest: "build/prod"
          }
        ],
                    options: {
              process: function (content, srcpath) {
                var prodContent = content;
                prodContent = content.replace(/build\/dev\/vinylize.js/g, "vinylize.min.js");
                prodContent = prodContent.replace(/build\/dev\/main.css/g, "main.css");
                return prodContent;
              }
            }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('prod', ['requirejs', 'uglify', 'compass', 'copy']);
  grunt.registerTask('default', ['requirejs', 'compass', 'connect']);
};