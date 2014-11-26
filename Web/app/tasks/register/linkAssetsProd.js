module.exports = function (grunt) {
	grunt.registerTask('linkAssetsProd', [
		'sails-linker:prodJsBefore',
		'sails-linker:prodJs',
		'sails-linker:prodStyles',
		'sails-linker:devTpl',// No difference between dev and prod for templates.
		'sails-linker:prodJsJade',
		'sails-linker:prodStylesJade',
		'sails-linker:devTplJade'// No difference between dev and prod for templates.
	]);
};
