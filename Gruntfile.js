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
                'public/lib/**/*.js',
                'test/**/*.js'
            ]
        },
        cafemocha: {
            options: {
                ui: 'bdd',
                reporter: 'spec'
            },
            unit: {
                src: ['test/unit/**/*.js']
            },
            end2end: {
                src: ['test/end2end/**/*.js']
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        watch: {
            files: ['<%= jshint.all %>', 'lib/**/*.jade', 'lib/**/*.less'],
            tasks: ['default'],
            options: {interrupt: true}
        },
        test: {
            clientside: {},
            serverside: {}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-cafe-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('karmaserver', ['karma:unit']);

    grunt.registerMultiTask('test', function() {
        if (this.target === 'serverside') {
            grunt.task.run('cafemocha');
        }
        else if (this.target === 'clientside') {
            grunt.task.run('karma:unit:run');
        }
        else {
            throw 'Unknown test task';
        }
    });

    grunt.registerTask('default', ['jshint', 'test']);


};
