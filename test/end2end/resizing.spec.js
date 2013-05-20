var chai = require('chai'),
    expect = chai.expect,
    support = require('../support');

describe('Resizing', function() {

    describe('Given I have a presentation running', function() {

        support.withLuxRunning();

        describe('When I visit in a browser', function() {

            var pageWrapper = support.withPresentationLoaded();

            describe('And I scale the window to 400x400', function() {

                before(function(done) {
                    pageWrapper.page.set('viewportSize', {
                        width: 400,
                        height: 400
                    }, function() { done(); });
                });

                it('Then it should scale the slides', function(done) {
                    pageWrapper.page.evaluate(
                        function() {
                            return window.$('.slides').css('transform');
                        },
                        function(transform) {
                            support.check(done, function() {
                                expect(transform).to.equal('matrix(0.5, 0, 0, 0.5, 0, 75)');
                            });
                        }
                    );
                });

            });

        });

    });

});

