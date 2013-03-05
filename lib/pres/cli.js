exports.start = start;

function start() {
    if (process.argv[2] === 'export') {
        var ex = require('./export');
        ex.exportPresentation();
    } else {
        var server = require('./server');
        server.start();
    }
}
