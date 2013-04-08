var sinon = require('sinon'),
    path = require('path'),
    ROOT = path.resolve(__dirname + '/../../../'),
    LIB = ROOT + '/lib/',
    TEST = ROOT + '/test/',
    server = require(LIB + 'presenteur/server'),
    request = require('supertest');

describe('Server', function() {

    var _server,
        stdout;

    beforeEach(function() {
        stdout = {
            write: sinon.spy()
        };
        _server = server.getServer({
            directory: TEST + 'fixtures/presentations/valid/',
            stdout: stdout,
            port: 3001
        });
    });

    describe('listening on port', function() {
        beforeEach(function(done) {
            _server.listen(done);
        });

        it('can listen for requests on a port', function(done) {
            request('http://localhost:3001')
                .get('/')
                .expect(/<title>Presenteur<\/title>/, done);
        });

        afterEach(function(done) {
            _server.stopListening(done);
        });
    });

});
