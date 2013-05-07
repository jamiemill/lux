define([
    'jQuery',
    'chai',
    'sinon',
    'sinon-chai',
    'isolate!lib/presenteur'
], function($, chai, sinon, sinonChai, Presenteur) {
    var expect = chai.expect;
    chai.use(sinonChai);

    var mockSlideshow = Presenteur.dependencies['lib/slideshow'];

    describe('Presenteur.init', function() {

        var $sandbox;

        beforeEach(function() {
            mockSlideshow.reset();
            $sandbox = $('<div class="presentation"></div>').appendTo('body');
        });

        afterEach(function() {
            $sandbox.remove();
            // TODO: clean up spies
        });

        it('initialises a slideshow with the first ".presentation" element on the page.', function() {
            Presenteur.init();

            expect(mockSlideshow).to.have.been.calledWithNew;
            var spyArgs = mockSlideshow.lastCall.args;
            expect(spyArgs[0].baseEl.get(0)).to.equal($sandbox.get(0));
        });

    });

});
