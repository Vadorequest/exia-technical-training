/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

	grunt.config.set('uglify', {
        before: {
            src: [
                '.tmp/public/concat/productionBefore.js'
            ],
            dest: '.tmp/public/min/productionBefore.js'
        },
		dist: {
			src: [
                '.tmp/public/concat/production.js'
            ],
			dest: '.tmp/public/min/production.min.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
};
