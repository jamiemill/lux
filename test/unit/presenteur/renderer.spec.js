var chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    path = require('path'),
    ROOT = path.resolve(__dirname + '/../../../'),
    LIB = ROOT + '/lib/',
    TEST = ROOT + '/test/',
    renderer = require(LIB + 'presenteur/renderer'),
    check = function(done, f) {
        try {
            f();
            done();
        } catch(e) {
            done(e);
        }
    };

chai.use(sinonChai);

// Disabled, I can't get it to work. See below.
//chai.use(chaiAsPromised);

describe('Renderer', function() {

    var rend,
        stdout;

    beforeEach(function() {
        stdout = {
            write: sinon.spy()
        };
    });

    describe('checkAssets', function() {

        describe('with missing index.jade file', function() {
            beforeEach(function() {
                rend = renderer.create({
                    directory: TEST + 'fixtures/presentations/noindex/',
                    stdout: stdout
                });
            });
            it('throws exception if no index.jade found.', function() {
                expect(function() {
                    rend.checkAssets();
                }).to.Throw('No index.jade file found.');
            });
        });

        describe('with missing layout.jade file', function() {
            beforeEach(function() {
                rend = renderer.create({
                    directory: TEST + 'fixtures/presentations/nolayout/',
                    stdout: stdout
                });
            });
            it('throws exception if no layout.jade found.', function() {
                expect(function() {
                    rend.checkAssets();
                }).to.Throw('No layout.jade file found.');
            });
        });

        describe('with both present', function() {
            beforeEach(function() {
                rend = renderer.create({
                    directory: TEST + 'fixtures/presentations/valid/',
                    stdout: stdout
                });
            });
            it('says that things are ok', function() {
                rend.checkAssets();
                expect(stdout.write.callCount).to.equal(3);
                expect(stdout.write.getCall(0).args[0]).to.equal('- Found /Users/jamiemill/Work/presenteur/src/test/fixtures/presentations/valid/index.jade.');
                expect(stdout.write.getCall(1).args[0]).to.equal('- Found /Users/jamiemill/Work/presenteur/src/test/fixtures/presentations/valid/layout.jade.');
                expect(stdout.write.getCall(2).args[0]).to.equal('- Serving extra assets from public/.');
            });

        });

    });

    describe('getIndexPage', function() {

        /*
         * TODO: do we really need to test the failures here? We have the
         * checkAssets() method already tested. Should we run that automatically?
         * Maybe the first time indexPage is requested? Or on construction?
         */

        describe('with missing index.jade file', function() {
            beforeEach(function() {
                rend = renderer.create({
                    directory: TEST + 'fixtures/presentations/noindex/',
                    stdout: stdout
                });
            });
            it('eventually fails with error', function(done) {
                // Can't get chai-as-promised to work :(
                // expect(rend.getIndexPage()).to.be.rejected.with('xxxxx').and.notify(done);

                rend.getIndexPage().then(function() {
                    done(new Error('should not succeed'));
                }, function(error) {
                    expect(error.message).to.match(/File does not exist/);
                    done();
                })
                .end();
            });
        });

        describe.skip('with missing layout.jade file', function() {
            beforeEach(function() {
                rend = renderer.create({
                    directory: TEST + 'fixtures/presentations/nolayout/',
                    stdout: stdout
                });
            });

            it('throws exception', function(done) {
                rend.getIndexPage().then(function() {
                    done(new Error('should not succeed'));
                }, function(error) {
                    expect(error.message).to.match(/File does not exist/);
                    done();
                })
                .end();
            });
        });

        describe('with both present', function() {
            beforeEach(function() {
                rend = renderer.create({
                    directory: TEST + 'fixtures/presentations/valid/',
                    stdout: stdout
                });
            });

            it('can return the index html', function(done) {
                rend.getIndexPage()
                    .then(function(html) {
                        expect(html).to.contain('<div class="slide"><h1>Slide 1</h1></div>');
                        expect(html).to.contain('<div class="slide"><h2>Slide 2</h2></div>');
                        done();
                    }, done)
                .end();
            });

        });

    });

});
