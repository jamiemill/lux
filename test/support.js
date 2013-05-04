var path = require('path'),
    ROOT = path.resolve(__dirname + '/../') + '/',
    LIB = ROOT + 'lib/',
    TEST = ROOT + 'test/';


/**
 * This is for wrapping a block containing an assertion in a safety
 * net that catches the failure and hands it back to the mocha
 * asyncronous `done` callback, instead of letting it go uncaught.
 */

function check(done, f) {
    try {
        f();
        done();
    } catch(e) {
        done(e);
    }
}

module.exports = {
    ROOT: ROOT,
    LIB: LIB,
    TEST: TEST,
    check: check
};

