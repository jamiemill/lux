var path = require('path');
var jade = require('jade');
var fs = require('fs');
var exec = require('child_process').exec;

exports.generate = generate;

function generate() {
    var skelDir = __dirname + '/skel/*';
    exec('cp -R ' + skelDir + ' .', puts);
    exec('mkdir public' , puts);
}

function puts(error, stdout, stderr) {
    console.log(stdout);
    if (error) {
        console.log(error);
    }
}
