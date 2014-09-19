module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
	    dev: {
	      options: {
	        script: 'bin/www'
	      }
	    }
	  },
	  watch: {
	    express: {
	      files:  [ '**/*.js'],
	      tasks:  [ 'express:dev' ],
	      options: {
	        spawn: false,
	        livereload: true
	      }
	    },
	    reload: {
	    	files:  ['**/*.styl' ],
	      options: {
	        livereload: true
	      }
	    }
	  },
	  concat: {
	    options: {
	      separator: ';',
	    },
	    deps: {
	      src: ['bower_components/jquery/dist/jquery.min.js'],
	      dest: 'public/scripts/deps.js',
	    },
	  }
  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat:deps', 'express:dev', 'watch' ])

};