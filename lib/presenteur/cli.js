exports.start = start;

var command = process.argv[2];

function start() {
    if (command === 'export') {

        require('./export').exportPresentation({
            stdout: process.stdout
        });

    } else if (command === 'generate') {

        require('./generator').generate({
            stdout: process.stdout
        });

    } else {

        require('./server').start({
            stdout: process.stdout
        });

    }
}
