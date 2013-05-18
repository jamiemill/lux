var fs = require('fs'),
    wrench = require('wrench');

exports.generate = function(options) {

    var destination = options.destination || '.',
        skelDir = __dirname + '/skel',
        stdout = options.stdout || process.stdout;

    if (fs.readdirSync(destination).length > 0) {
        throw 'Directory is not empty.';
    }

    stdout.write('Copying skeleton directory...');

    wrench.copyDirSyncRecursive(skelDir, destination);

    stdout.write('Done');
};

