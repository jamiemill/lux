define([
    'jQuery',
    'chai',
    'sinon'
], function($, chai, sinon) {
    var expect = chai.expect;

    var Presenteur = window.Presenteur = window.Presenteur || {};

    describe('KeyboardController', function() {

        var keyboardController, fakeSlideshow;

        beforeEach(function() {
            fakeSlideshow = {
                next: sinon.spy(),
                previous: sinon.spy()
            };
            keyboardController = new Presenteur.KeyboardController({
                slideshow: fakeSlideshow
            });
        });

        describe('When spacebar is pressed', function() {

            beforeEach(function() {
                var SPACE = 32;
                $('body').trigger(jQuery.Event('keyup', {keyCode: SPACE}));
            });

            it('advances the slideshow', function() {
                expect(fakeSlideshow.next).to.have.been.called;
            });
        });

    });

});
