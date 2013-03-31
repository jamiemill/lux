var chai = require('chai'),
    expect = chai.expect,
    path = require('path'),
    ROOT = path.resolve(__dirname+'/../../../'),
    LIB = ROOT + '/lib/',
    TEST = ROOT + '/test/',
    presentation = require(LIB + 'presenteur/presentation');

describe('Presentation', function() {

    var pres;

    describe('with missing index.jade file', function() {
        beforeEach(function() {
            pres = presentation.create({
                directory: TEST + 'fixtures/presentations/noindex/'
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
                directory: TEST + 'fixtures/presentations/nolayout/'
            });
        });
        it('throws exception if no layout.jade found.', function() {
            expect(function() {
                pres.checkAssets();
            }).to.Throw('No layout.jade file found.');
        });
    });

});
