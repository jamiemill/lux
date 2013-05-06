define([
    'jQuery',
    'chai',
    'sinon'
], function($, chai, sinon) {
    var expect = chai.expect;

    var Presenteur = window.Presenteur = window.Presenteur || {};

    describe('Presenteur.init', function() {

        var $sandbox;

        beforeEach(function() {
            sinon.stub(Presenteur, 'Slideshow');
            sinon.stub(Presenteur, 'KeyboardController');
            $sandbox = $('<div class="presentation"></div>').appendTo('body');
            Presenteur.init();
        });

        afterEach(function() {
            $sandbox.remove();
        });

        it('initialises a slideshow with the first ".presentation" element on the page.', function() {
            expect(Presenteur.Slideshow).to.have.been.calledWith({baseEl: $sandbox});
        });

    });

});
