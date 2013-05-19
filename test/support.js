var path = require('path'),
    spawn = require('child_process').spawn,
    phantomProxy = require('phantom-proxy'),
    ROOT = path.resolve(__dirname + '/../') + '/',
    LIB = ROOT + 'lib/',
    TEST = ROOT + 'test/';

module.exports = {
    ROOT: ROOT,
    LIB: LIB,
    TEST: TEST,
    check: check,
    withLuxRunning: withLuxRunning,
    withPresentationLoaded: withPresentationLoaded
};

/**
 * This factors out the small amount of logic necessary for ensuring
 * done() is always called in an asyncronous test, even if it fails.
 * Otherwise an assertion error will be thrown and execution would return
 * before your call to done() is reached.
 */

function check(done, f) {
    try {
        f();
        done();
    } catch(e) {
        done(e);
    }
}

function withLuxRunning() {
    var luxProcess;

    before(function(done) {
        var command = ROOT + 'bin/lux';
        luxProcess = spawn(command, ['start'], {
            cwd: TEST + 'fixtures/presentations/valid',
            stdio: ['pipe', 'pipe', process.stderr]
        });
        luxProcess.stdout.on('data', function(data) {
            if(/Presentation running/.test(data)) {
                done();
            }
        });
    });

    after(function() {
        luxProcess.kill();
    });
}

function withPresentationLoaded() {
    var phantom, returns = {};

    before(function(done) {
        this.timeout(10000);
        phantomProxy.create({}, function(p) {
            phantom = p;
            returns.page = phantom.page;
            returns.page.open('http://localhost:3000', function() {
                done();
            });
        });
    });

    after(function(done) {
        phantom.end(function() { done(); });
    });

    return returns;
}

