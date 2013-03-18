var path = require('path'),
    jade = require('jade'),
    fs = require('fs'),
    deferred = require('deferred'),
    exec = deferred.promisify(require('child_process').exec);

exports.generate = generate;

function generate() {
    var skelDir = __dirname + '/skel/*';

    console.log('Copying skeleton directory...');
    exec('cp -R ' + skelDir + ' .')
    .then(function() {
        console.log('Done.');
        console.log('Making public directory...');
        return exec('mkdir public');
    })
    .then(function() {
        console.log('Done');
    })
    .end();
}

