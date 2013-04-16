var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    temp = require('temp'),
    fs = require('fs'),
    support = require('../../support'),
    generator = require(support.LIB + 'presenteur/generator');

chai.use(require('sinon-chai'));

describe('Generator', function() {

    var tmpDir;

    describe('when directory is not empty', function() {
        beforeEach(function() {
            tmpDir = temp.mkdirSync();
            fs.writeFileSync(tmpDir + '/somefile', 'content');
        });

        it('throws an error', function() {
            expect(function() {
                generator.generate({
                    destination: tmpDir
                });
            }).to.Throw('Directory is not empty.');
        });
    });

    describe('when directory is empty', function() {
        beforeEach(function() {
            tmpDir = temp.mkdirSync();
        });

        it('generates a skeleton project', function() {
            generator.generate({
                destination: tmpDir
            });
            var listing = fs.readdirSync(tmpDir);
            expect(listing.length).to.equal(2);
            expect(listing).to.contain('index.jade');
            expect(listing).to.contain('public');
        });
    });


});
