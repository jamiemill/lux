define([
    'jquery',
    'chai',
    'sinon',
    'sinon-chai',
    'isolate!lib/lux'
], function($, chai, sinon, sinonChai, Lux) {

    var expect = chai.expect,
        MockSlideshow = Lux.dependencies['lib/slideshow'],
        MockKeyboardController = Lux.dependencies['lib/keyboard-controller'];

    chai.use(sinonChai);

    describe('Lux.init', function() {

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
            Lux.init();

            expect(MockSlideshow).to.have.been.calledWithNew;
            expect(MockSlideshow.lastCall.args[0].baseEl.get(0)).to.equal($sandbox.get(0));
        });

        it('connects a keyboard controller', function() {
            Lux.init();
            var newSlideshow = MockSlideshow.lastCall.thisValue;

            expect(MockKeyboardController).to.have.been.calledWithNew;
            var passedSlideshow = MockKeyboardController.lastCall.args[0].slideshow;
            expect(passedSlideshow).to.equal(newSlideshow);
        });

    });

});
