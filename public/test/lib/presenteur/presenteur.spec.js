define([
    'jQuery',
    'chai',
    'sinon',
    'sinon-chai',
    'lib/presenteur',
    'lib/keyboard-controller',
    'lib/slideshow'
], function($, chai, sinon, sinonChai, Presenteur, KeyboardController, Slideshow) {
    var expect = chai.expect;
    chai.use(sinonChai);

    describe('Presenteur.init', function() {

        var $sandbox;

        beforeEach(function() {
            sinon.spy(Slideshow);
            sinon.spy(KeyboardController);
            $sandbox = $('<div class="presentation"></div>').appendTo('body');
            Presenteur.init();
        });

        afterEach(function() {
            $sandbox.remove();
            // TODO: clean up spies
        });

        it('initialises a slideshow with the first ".presentation" element on the page.', function() {
            expect(Slideshow).to.have.been.calledWith({baseEl: $sandbox});
        });

    });

});
