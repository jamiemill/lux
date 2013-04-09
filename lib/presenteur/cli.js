exports.start = start;

var command = process.argv[2];

function start() {

    if (command === 'start') {
        require('./server').getServer({
            stdout: process.stdout
        }).listen();
    } else {
        process.stdout.write('No command specified.');
        process.exit(127);
    }
}
