define([
    'jQuery',
    'chai',
    'sinon',
    'sinon-chai',
    'isolate!lib/presenteur'
], function($, chai, sinon, sinonChai, Presenteur) {

    var expect = chai.expect,
        MockSlideshow = Presenteur.dependencies['lib/slideshow'],
        MockKeyboardController = Presenteur.dependencies['lib/keyboard-controller'];

    chai.use(sinonChai);

    describe('Presenteur.init', function() {

        var $sandbox;

        beforeEach(function() {
            MockSlideshow.reset();
            MockKeyboardController.reset();
            $sandbox = $('<div class="presentation"></div>').appendTo('body');
        });

        afterEach(function() {
            $sandbox.remove();
            // TODO: clean up spies
        });

        it('initialises a slideshow with the first ".presentation" element on the page.', function() {
            Presenteur.init();

            expect(MockSlideshow).to.have.been.calledWithNew;
            expect(MockSlideshow.lastCall.args[0].baseEl.get(0)).to.equal($sandbox.get(0));
        });

        it('connects a keyboard controller', function() {
            Presenteur.init();
            var newSlideshow = MockSlideshow.lastCall.thisValue;

            expect(MockKeyboardController).to.have.been.calledWithNew;
            var passedSlideshow = MockKeyboardController.lastCall.args[0].slideshow;
            expect(passedSlideshow).to.equal(newSlideshow);
        });

    });

});
