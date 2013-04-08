var sinon = require('sinon'),
    path = require('path'),
    ROOT = path.resolve(__dirname + '/../../../'),
    LIB = ROOT + '/lib/',
    TEST = ROOT + '/test/',
    app = require(LIB + 'presenteur/app'),
    request = require('supertest');

describe('App', function() {

    var _app,
        stdout;

    beforeEach(function() {
        stdout = {
            write: sinon.spy()
        };
        _app = app.createApp({
            directory: TEST + 'fixtures/presentations/valid/',
            stdout: stdout,
            port: 3001
        });
    });

    it('serves the presentation content', function(done) {
        request(_app.app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /text\/html/)
            .expect(/<title>Presenteur<\/title>/, done);
    });

});
