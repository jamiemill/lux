exports.start = start;

function start() {
    if (process.argv[2] === 'export') {
        var ex = require('./export');
        ex.exportPresentation();
    } else if (process.argv[2] === 'generate') {
        var generator = require('./generator');
        generator.generate();
    } else {
        var server = require('./server');
        server.start();
    }
}
