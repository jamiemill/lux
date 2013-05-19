var chai = require('chai'),
    expect = chai.expect,
    support = require('../support');

describe('Basic operation', function() {

    describe('Given I have a presentation running', function() {

        support.withLuxRunning();

        describe('When I visit in a browser', function() {

            var pageWrapper = support.withPresentationLoaded();

            it('Then the first slide text should be present', function(done) {
                pageWrapper.page.evaluate(
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
                pageWrapper.page.evaluate(
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
                pageWrapper.page.evaluate(
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
                    pageWrapper.page.sendEvent({event: 'keypress', keys: SPACE}, function() {
                        done();
                    });
                });

                it('Then the second slide is shown', function(done) {
                    pageWrapper.page.evaluate(
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
                    pageWrapper.page.evaluate(
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

