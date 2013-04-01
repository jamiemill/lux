var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require("sinon-chai"),
    path = require('path'),
    ROOT = path.resolve(__dirname+'/../../../'),
    LIB = ROOT + '/lib/',
    TEST = ROOT + '/test/',
    presentation = require(LIB + 'presenteur/presentation');

chai.use(sinonChai);

describe('Presentation', function() {

    var pres,
        stdout;

    beforeEach(function() {
        stdout = {
            write: sinon.spy()
        };
    });

    describe('with missing index.jade file', function() {
        beforeEach(function() {
            pres = presentation.create({
                directory: TEST + 'fixtures/presentations/noindex/',
                stdout: stdout
            });
        });
        it('throws exception if no index.jade found.', function() {
            expect(function() {
                pres.checkAssets();
            }).to.Throw('No index.jade file found.');
        });
    });

    describe('with missing layout.jade file', function() {
        beforeEach(function() {
            pres = presentation.create({
                directory: TEST + 'fixtures/presentations/nolayout/',
                stdout: stdout
            });
        });
        it('throws exception if no layout.jade found.', function() {
            expect(function() {
                pres.checkAssets();
            }).to.Throw('No layout.jade file found.');
        });
    });

    describe('with both present', function() {
        beforeEach(function() {
            pres = presentation.create({
                directory: TEST + 'fixtures/presentations/valid/',
                stdout: stdout
            });
        });
        it('says that things are ok', function() {
            pres.checkAssets();
            expect(stdout.write.callCount).to.equal(3);
            expect(stdout.write.getCall(0).args[0]).to.equal('- Found /Users/jamiemill/Work/presenteur/src/test/fixtures/presentations/valid/index.jade.');
            expect(stdout.write.getCall(1).args[0]).to.equal('- Found /Users/jamiemill/Work/presenteur/src/test/fixtures/presentations/valid/layout.jade.');
            expect(stdout.write.getCall(2).args[0]).to.equal('- Serving extra assets from public/.');
        });
    });

});
