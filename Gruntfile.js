module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            css: {
                src: 'src/css/spectacular-checkbox.css',
                dest: 'dist/css/spectacular-checkbox.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/js/spectacular-checkbox.min.js': ['src/js/spectacular-checkbox.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['cssmin:css', 'uglify:js']);
};
