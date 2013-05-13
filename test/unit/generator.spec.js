var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    temp = require('temp'),
    fs = require('fs'),
    support = require('../support'),
    generator = require(support.LIB + 'generator');

chai.use(require('sinon-chai'));

describe('Generator', function() {

    var tmpDir, stdoutSpy;

    describe('when directory is not empty', function() {
        beforeEach(function() {
            tmpDir = temp.mkdirSync();
            fs.writeFileSync(tmpDir + '/somefile', 'content');
            stdoutSpy = sinon.spy();
        });

        it('throws an error', function() {
            expect(function() {
                generator.generate({
                    destination: tmpDir,
                    stdout: { write: stdoutSpy }
                });
            }).to.Throw('Directory is not empty.');
        });
    });

    describe('when directory is empty', function() {
        beforeEach(function() {
            tmpDir = temp.mkdirSync();
            stdoutSpy = sinon.spy();
        });

        it('generates a skeleton project', function() {
            generator.generate({
                destination: tmpDir,
                stdout: { write: stdoutSpy }
            });
            var listing = fs.readdirSync(tmpDir);
            expect(listing.length).to.equal(2);
            expect(listing).to.contain('index.jade');
            expect(listing).to.contain('public');
        });

        it('logs success', function() {
            generator.generate({
                destination: tmpDir,
                stdout: { write: stdoutSpy }
            });
            expect(stdoutSpy).to.have.been.calledWith('Copying skeleton directory...');
            expect(stdoutSpy).to.have.been.calledWith('Done');
        });
    });


});
