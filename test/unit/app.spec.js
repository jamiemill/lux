var sinon = require('sinon'),
    request = require('supertest'),
    support = require('../support'),
    app = require(support.LIB + 'app');

describe('App', function() {

    var _app,
        stdout;

    beforeEach(function() {
        stdout = {
            write: sinon.spy()
        };
        _app = app.createApp({
            directory: support.TEST + 'fixtures/presentations/valid/',
            stdout: stdout,
            port: 3001
        });
    });

    it('serves the presentation content', function(done) {
        request(_app.app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /text\/html/)
            .expect(/<title>Lux<\/title>/, done);
    });

    it('serves the scripts', function(done) {
        request(_app.app)
            .get('/lib/slideshow.js')
            .expect(200, done);
    });

});
