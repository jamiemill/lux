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
                ui: 'bdd',
                reporter: 'dot'
            },
            src: 'test/unit/**/*.js'
        },
        // NOTE: need to start karma server first in
        // separate window with `grunt karma:unit`
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        watch: {
            files: '**/*.js',
            tasks: ['jshint', 'cafemocha', 'karma:unit:run']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-cafe-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jshint', 'cafemocha', 'karma:unit:run']);

};
