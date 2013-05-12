var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    support = require('../../support'),
    renderer = require(support.LIB + 'lux/renderer');

chai.use(require('sinon-chai'));

describe('Renderer', function() {

    var rend,
        stdout;

    beforeEach(function() {
        stdout = {
            write: sinon.spy()
        };
    });

    describe('with missing index.jade file', function() {
        it('throws exception if no index.jade found.', function() {
            expect(function() {
                rend = renderer.create({
                    directory: support.TEST + 'fixtures/presentations/noindex/',
                    stdout: stdout
                });
            }).to.Throw('No index.jade file found.');
        });
    });

    describe('with index.jade file', function() {
        beforeEach(function() {
            rend = renderer.create({
                directory: support.TEST + 'fixtures/presentations/valid/',
                stdout: stdout
            });
        });

        it('says that things are ok', function() {
            expect(stdout.write.callCount).to.equal(2);
            expect(stdout.write.getCall(0).args[0]).to.equal('- Found /Users/jamiemill/Work/presenteur/src/test/fixtures/presentations/valid/index.jade.\n');
            expect(stdout.write.getCall(1).args[0]).to.equal('- Serving extra assets from public/.\n');
        });

        it('can return the index html', function(done) {
            rend.getIndexPage()
                .then(function(html) {
                    expect(html).to.contain('<h1>Slide 1</h1>');
                    expect(html).to.contain('<h2>Slide 2</h2>');
                    done();
                }, done)
            .end();
        });

        it('wraps the index page in the layout', function(done) {
            rend.getIndexPage()
                .then(function(html) {
                    expect(html).to.contain('<title>Lux</title>');
                    done();
                }, done)
            .end();
        });

        it('includes the assets', function(done) {
            rend.getIndexPage()
                .then(function(html) {
                    expect(html).to.contain('<script src="components/require.js"></script>');
                    expect(html).to.contain('<script src="lib/requirejs-config.js"></script>');
                    expect(html).to.contain('<script src="lib/main.js"></script>');
                    done();
                }, done)
            .end();
        });
    });

});
