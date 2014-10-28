// Load our config.
var __config = require('./../config')();

/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

    grunt.config.set('copy', {
        dev: {
            files: [
                // Copy all assets excepted some extension that are used server side only (less, ts, coffee, ...).
                {
                    expand: true,
                    cwd: './assets',
                    src: ['**/*.!(coffee|ts|d.ts|less|md|ejs)'],
                    dest: '.tmp/public'
                },
                // Copy all shared/public files into the public/shared directory accessible from client side.
                {
                    expand: true,
                    cwd: './shared/app/public',
                    src: ['**/*.js'],
                    dest: '.tmp/public/js/shared',
                    ext: '.min.js'
                },// Copy all mapping files from the shared/public directory in the client side, they are used to debug in the browser.
                {
                    expand: true,
                    cwd: './shared/app/public',
                    src: ['**/*.js.map'],
                    dest: '.tmp/public/js/shared',
                    ext: '.js.map'
                },// Copy all TS files from the shared/public directory in the client side, they are used to debug in the browser.
                {
                    expand: true,
                    cwd: './shared/app/public',
                    src: ['**/*.ts'],
                    dest: '.tmp/public/js/shared',
                    ext: '.ts'
                },// Copy all globals files into the public/globals directory accessible from client side.
                {
                    expand: true,
                    cwd: './assets/js/' + __config.environment,
                    src: ['**/*.js'],
                    dest: '.tmp/public/linker/js/'+ __config.environment,
                    ext: '.min.js'
                },// Copy all mapping files from the shared/public directory in the client side, they are used to debug in the browser.
                {
                    expand: true,
                    cwd: './assets/js/' + __config.environment,
                    src: ['**/*.js.map'],
                    dest: '.tmp/public/linker/js/'+ __config.environment,
                    ext: '.js.map'
                },
                // Copy the private locales  files into the public/language directory accessible from client side.
                {
                    expand: true,
                    cwd: './config/locales',
                    src: ['**/*.json'],
                    dest: '.tmp/public/languages'
                }
            ]
        },
        build: {
            files: [{
                expand: true,
                cwd: '.tmp/public',
                src: ['**/*'],
                dest: 'www'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
