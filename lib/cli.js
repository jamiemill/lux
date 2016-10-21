var command = process.argv[2];

exports.start = function() {

    if (command === 'start') {
        require('./server').getServer({
            stdout: process.stdout
        }).listen();
    } else if (command === 'generate') {
        require('./generator').generate({
            stdout: process.stdout
        });
    } else if (command === 'export') {
        require('./exporter').exportPresentation({
            stdout: process.stdout
        });
    } else {
        process.stdout.write('No command specified.');
        process.exit(127);
    }
};
