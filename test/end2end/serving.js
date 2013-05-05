var phantomProxy = require('phantom-proxy'),
    spawn = require('child_process').spawn,
    chai = require('chai'),
    expect = chai.expect,
    support = require('../support');

describe('Serving a presentation', function() {

    describe('Given I have a presentation running', function() {

        var child;

        before(function(done) {
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

        after(function() {
            child.kill();
        });

        describe('When I visit in a browser', function() {

            var proxy, page;

            before(function(done) {
                this.timeout(10000);
                phantomProxy.create({}, function(p) {
                    proxy = p;
                    page = p.page;
                    page.open('http://localhost:3000', function() {
                        done();
                    });
                });
            });

            after(function(done) {
                proxy.end(function() { done(); });
            });

            it('The first slide text should be present', function(done) {
                page.evaluate(
                    function() {
                        return window.$('h1:visible').text();
                    },
                    function(text) {
                        support.check(done, function() {
                            expect(text).to.equal('Slide 1');
                        });
                    }
                );
            });

            it('And show the first slide', function(done) {
                page.evaluate(
                    function() {
                        return window.$('.slide:nth-child(1)').is(':visible');
                    },
                    function(visible) {
                        support.check(done, function() {
                            expect(visible).to.equal('true');
                        });
                    }
                );
            });

            it('And hide the second slide', function(done) {
                page.evaluate(
                    function() {
                        return window.$('.slide:nth-child(2)').is(':visible');
                    },
                    function(visible) {
                        support.check(done, function() {
                            expect(visible).to.equal('false');
                        });
                    }
                );
            });

        });

    });

});

