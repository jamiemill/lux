var path = require('path'),
    jade = require('jade'),
    fs = require('fs'),
    wrench = require('wrench');

exports.generate = generate;

function generate(options) {
    var destination = options.destination || '.',
        skelDir = __dirname + '/skel',
        stdout = options.stdout || process.stdout;

    if (fs.readdirSync(destination).length > 0) {
        throw 'Directory is not empty.';
    }

    stdout.write('Copying skeleton directory...');

    wrench.copyDirSyncRecursive(skelDir, destination);

    stdout.write('Done');
}

