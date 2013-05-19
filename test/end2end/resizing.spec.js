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

                it('should scale the slides', function(done) {
                    pageWrapper.page.evaluate(
                        function() {
                            return window.$('.presentation').width();
                        },
                        function(width) {
                            support.check(done, function() {
                                expect(width).to.equal('400');
                            });
                        }
                    );
                });
            });

        });

    });

});

