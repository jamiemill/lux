exports.start = start;

function start() {
    require('./server').getServer({
        stdout: process.stdout
    }).listen();
}
