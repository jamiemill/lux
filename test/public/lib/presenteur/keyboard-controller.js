(function($, chai, sinon) {
    var expect = chai.expect;

    var Presenteur = window.Presenteur = window.Presenteur || {};

    describe('KeyboardController', function() {

        var keyboardController, fakePresentation;

        beforeEach(function() {
            fakePresentation = {
                next: sinon.spy(),
                previous: sinon.spy()
            };
            keyboardController = new Presenteur.KeyboardController({
                presentation: fakePresentation
            });
        });

        describe('When spacebar is pressed', function() {

            beforeEach(function() {
                var SPACE = 32;
                $('body').trigger(jQuery.Event('keyup', {keyCode: SPACE}));
            });

            it('advances the presentation', function() {
                expect(fakePresentation.next).to.have.been.called;
            });
        });

    });

})(jQuery, window.chai, window.sinon);
