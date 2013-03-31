module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'lib/**/*.js',
                'public/javascripts/lib/**/*.js',
                'test/**/*.js'
            ]
        },
        cafemocha: {
            options: {
                ui: 'bdd'
            },
            src: 'test/unit/**/*.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-cafe-mocha');

    grunt.registerTask('default', ['jshint', 'cafemocha']);

};
