define([
    'jquery',
    'chai',
    'chai-jquery',
    'sinon',
    'lib/autosizer'
], function($, chai, chaiJquery, sinon, Autosizer) {
    var expect = chai.expect;
    chai.use(chaiJquery);

    describe('Autosizer', function() {

        var autosizer, fakeSlideshow, $baseEl;

        describe('when height constrained', function() {

            beforeEach(function() {
                $baseEl = $('<div><div class="slides"></div></div>').css({width: 400, height: 200});
                fakeSlideshow = {
                    _$baseEl: $baseEl
                };
                autosizer = new Autosizer({
                    slideshow: fakeSlideshow
                });
            });

            it('should resize to fit the presentation', function() {
                // presentation element is 400x200
                // nominal size is 800x500
                // so expected scale is constrained by height
                // to 2/5 = 0.4
                var expectedScale = 'scale(0.4)';
                // because it's height constrained, we expect vertical translate
                // to be 0
                // the new width will be 800*0.4 = 320
                // that leaves 80 pixels to distribute either size of it
                // so the horizontal offset should be 40.
                // but the offset needs to be scaled back up by dividing by the scale
                // so 40/0.4 = 100
                var expectedTranslate = 'translate(100px, 0px)';
                var expectedTransform = [expectedScale, expectedTranslate].join(' ');
                expect($baseEl.find('.slides')).to.have.css('transform', expectedTransform);
            });

        });

        describe('when width constrained', function() {

            beforeEach(function() {
                $baseEl = $('<div><div class="slides"></div></div>').css({width: 400, height: 800});
                fakeSlideshow = {
                    _$baseEl: $baseEl
                };
                autosizer = new Autosizer({
                    slideshow: fakeSlideshow
                });
            });

            it('should resize to fit the presentation', function() {
                // presentation element is 400x800
                // nominal size is 800x500
                // so expected scale is constrained by width
                // to 1/2 = 0.5
                var expectedScale = 'scale(0.5)';
                // because it's width constrained, we expect horizontal translate
                // to be 0
                // the new height will be 500*0.5 = 250
                // that leaves 550 pixels to distribute above and below
                // so the vertical offset should be 275
                // but the offset needs to be scaled back up by dividing by the scale
                // so 275/0.5 = 550
                var expectedTranslate = 'translate(0px, 550px)';
                var expectedTransform = [expectedScale, expectedTranslate].join(' ');
                expect($baseEl.find('.slides')).to.have.css('transform', expectedTransform);
            });

        });

        describe('when window resizes', function() {
            beforeEach(function() {
                $baseEl = $('<div><div class="slides"></div></div>').css({width: 400, height: 800});
                fakeSlideshow = {
                    _$baseEl: $baseEl
                };
                autosizer = new Autosizer({
                    slideshow: fakeSlideshow
                });
                $baseEl.css({width: 400, height: 200});
                $(window).trigger('resize');
            });

            it('should fit the new size', function() {
                var expectedScale = 'scale(0.4)';
                var expectedTranslate = 'translate(100px, 0px)';
                var expectedTransform = [expectedScale, expectedTranslate].join(' ');
                expect($baseEl.find('.slides')).to.have.css('transform', expectedTransform);
            });
        });

    });

});
