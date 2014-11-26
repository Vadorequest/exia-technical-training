module.exports = function (grunt) {
    /**
     * For the moment, there are no difference between dev and prod rules, so we apply development rules even in a production environment.
     */
    grunt.registerTask('compileAssetsProd', [
        'clean:dev',
        'jst:dev',
        'less:dev',
        'copy:dev',
        'coffee:dev'
    ]);
};
