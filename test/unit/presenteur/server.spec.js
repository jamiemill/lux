var sinon = require('sinon'),
    request = require('supertest'),
    support = require('../../support'),
    server = require(support.LIB + 'presenteur/server');

describe('Server', function() {

    var _server,
        stdout;

    beforeEach(function() {
        stdout = {
            write: sinon.spy()
        };
        _server = server.getServer({
            directory: support.TEST + 'fixtures/presentations/valid/',
            stdout: stdout,
            port: 3001
        });
    });

    describe('listening on port', function() {
        beforeEach(function(done) {
            _server.listen(done);
        });

        it('responds with content', function(done) {
            request('http://localhost:3001')
                .get('/')
                .expect(/<title>Presenteur<\/title>/, done);
        });

        afterEach(function(done) {
            _server.stopListening(done);
        });
    });

});
