var phantomProxy = require('phantom-proxy'),
    spawn = require('child_process').spawn,
    chai = require('chai'),
    expect = chai.expect,
    support = require('../support');

describe('Basic operation', function() {

    describe('Given I have a presentation running', function() {

        var child;

        before(function(done) {
            var command = support.ROOT + 'bin/lux';
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

            var phantom, page;

            before(function(done) {
                this.timeout(10000);
                phantomProxy.create({}, function(p) {
                    phantom = p;
                    page = p.page;
                    page.open('http://localhost:3000', function() {
                        done();
                    });
                });
            });

            after(function(done) {
                phantom.end(function() { done(); });
            });

            it('Then the first slide text should be present', function(done) {
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

            it('And the first slide should be shown', function(done) {
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

            it('And the second slide should be hidden', function(done) {
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

            describe('When I press the spacebar', function() {

                before(function(done) {
                    var SPACE = 32;
                    page.sendEvent({event: 'keypress', keys: SPACE}, function() {
                        done();
                    });
                });

                it('Then the second slide is shown', function(done) {
                    page.evaluate(
                        function() {
                            return window.$('.slide:nth-child(2)').is(':visible');
                        },
                        function(visible) {
                            support.check(done, function() {
                                expect(visible).to.equal('true');
                            });
                        }
                    );
                });

                it('And the first is hidden', function(done) {
                    page.evaluate(
                        function() {
                            return window.$('.slide:nth-child(1)').is(':visible');
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

});

