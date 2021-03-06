module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
	    install: {
	    	options:{
	    		targetDir: 'public/scripts/deps/bower'
	    	}
	    }
	  },
    express: {
	    dev: {
	      options: {
	        script: 'bin/www'
	      }
	    }
	  },
	  watch: {
	    express: {
	      files:  [ '**/*.js', '!node_modules/**/*.js', '!bower_components/**/*.js'],
	      tasks:  [ 'express:dev' ],
	      options: {
	        spawn: false,
	        livereload: true
	      }
	    },
	    reload: {
	    	files:  ['public/**/*.styl' ],
	      options: {
	        livereload: true
	      }
	    }
	  },
	  concat: {
	    options: {
	      separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
	      stripBanners: true
	    },
	    deps: {
	      src: [
	      	'public/scripts/deps/bower/jquery/jquery.js',
	      	'public/scripts/deps/bower/jquery.scrollTo/jquery.scrollTo.js',
	      	'public/scripts/deps/bower/sweetalert/sweet-alert.js',
	      	
	      	
	      	
	      	'public/scripts/deps/raf.js',
	      	'public/scripts/deps/ga.js',
	      ],
	      dest: 'public/scripts/deps.js',
	    },
	    conditionizr: {
	    	src: [
	    		'public/scripts/deps/bower/conditionizr/dist/conditionizr.min.js',
		      'public/scripts/deps/bower/conditionizr/detects/ie8.js',
		      'public/scripts/deps/bower/conditionizr/detects/ie9.js',
		      'public/scripts/deps/bower/conditionizr/detects/ie10.js'
	    	],
	    	dest: 'public/scripts/conditionizr.js'
	    }
	  },

		uglify: {
			prod: {
				files: {
				'public/scripts/deps.js': ['public/scripts/deps.js']
				}
			}
		}
  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('default', ['bower:install', 'concat', 'express:dev', 'watch' ])
  grunt.registerTask('prod', ['bower:install', 'concat:deps', 'uglify:prod'])

};