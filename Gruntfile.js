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
	      	'bower_components/jquery/dist/jquery.min.js',
	      	'bower_components/jquery.scrollTo/jquery.scrollTo.min.js',
	      ],
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