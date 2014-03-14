module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			files: ['<%= jasmine.test.options.specs %>', '<%= jasmine.test.src %>'],
			tasks: ['uglify', 'jasmine']
		},
		jasmine: {
			test: {
				// Your project's source files
				src: 'js/src/*.js',
				options: {
					// Your Jasmine spec files
					specs: 'js/test/*.spec.js',
					// Your spec helper files
					helpers: [
						'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
						'node_modules/jasmine-ajax/lib/mock-ajax.js'
					],
					vendor: ['js/vendor/*.js'],
					keepRunner: false
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			my_target: {
				options: {
					sourceMap: true,
					sourceMapName: 'js/dist/PhilipsTv.map',
					compress: {
						drop_console: true
					}
				},
				files: {
					'js/dist/PhilipsTv.min.js': ['js/src/PhilipsTv.js']
				}
			}
		}
	});

	// Register tasks.
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', 'jasmine');
};