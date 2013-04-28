var Browser = require('zombie'),
    spawn = require('child_process').spawn,
    chai = require('chai'),
    expect = chai.expect,
    support = require('../support');

describe('Given I have a presentation running', function() {

    var child;

    beforeEach(function(done) {
        var command = support.ROOT + 'bin/presenteur';
        child = spawn(command, ['start'], {
            cwd: support.TEST + 'fixtures/presentations/valid',
            stdio: ['pipe', 'pipe', process.stderr]
        });
        child.stdout.on('data', function(data) {
            if(/Presentation running/.test(data)) {
                done();
            }
        });
    });

    afterEach(function() {
        child.kill();
    });

    describe('When I visit in a browser', function() {

        var browser;

        beforeEach(function(done) {
            browser = new Browser();
            browser.visit('http://localhost:3000', done);
        });

        it('Then it should show me the first slide', function() {
            expect(browser.text('h1')).to.equal('Slide 1');
        });

        it('And apply the initial state', function() {
            expect(browser.query('.slide:nth-child(1)').className).to.contain('current');
            expect(browser.query('.slide:nth-child(2)').className).to.contain('future');
        });

        it('And load the styles', function() {
            expect(browser.query('link[href="stylesheets/style.css"]')).to.be.ok;
        });

    });

});
