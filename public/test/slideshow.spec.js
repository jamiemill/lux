define([
    'jquery',
    'chai',
    'lib/slideshow'
], function($, chai, Slideshow) {
    var expect = chai.expect;

    describe('Slideshow', function() {

        var slideshow,
            html = [
                '<div>',
                '  <div class="slide">Slide 0</div>',
                '  <div class="slide">Slide 1</div>',
                '  <div class="slide">Slide 2</div>',
                '  <div class="slide">Slide 3</div>',
                '</div>'
            ].join('\n'),
            $htmlFixture = $(html),
            getTexts = function(selector) {
                return $htmlFixture.find(selector).map(function(i, el) {
                    return $(el).text();
                }).get().join(', ');
            },
            check = function(done, f) {
                try {
                    f();
                    done();
                } catch(e) {
                    done(e);
                }
            };

        beforeEach(function() {
            slideshow = new Slideshow({
                baseEl: $htmlFixture
            });
        });

        describe('Initialisation', function() {

            it('should recognise two slides', function() {
                expect(slideshow.getSlideCount()).to.equal(4);
            });

            it('should start on slide 0', function() {
                expect(slideshow.getCurrentSlide()).to.equal(0);
            });

            it('should apply the correct starting classes', function() {
                expect(getTexts('.current')).to.equal('Slide 0');
                expect(getTexts('.past')).to.equal('');
                expect(getTexts('.future')).to.equal('Slide 1, Slide 2, Slide 3');
            });

            /* TODO: can't get this to work */

            it.skip('enables transitions on the next tick', function(done) {
                expect($htmlFixture).not.to.have.Class('enable-transitions');
                setTimeout(function() {
                    check(done, function() {
                        expect($htmlFixture).to.have.Class('enable-transitions');
                    });
                }, 1000);
            });

        });

        describe('Navigation', function() {

            it('advances when next is called', function() {
                slideshow.next();

                expect(slideshow.getCurrentSlide()).to.equal(1);

                expect(getTexts('.current')).to.equal('Slide 1');
                expect(getTexts('.past')).to.equal('Slide 0');
                expect(getTexts('.future')).to.equal('Slide 2, Slide 3');
            });

            it('goes back when previous is called', function() {
                slideshow.next();
                slideshow.previous();

                expect(slideshow.getCurrentSlide()).to.equal(0);

                expect(getTexts('.current')).to.equal('Slide 0');
                expect(getTexts('.past')).to.equal('');
                expect(getTexts('.future')).to.equal('Slide 1, Slide 2, Slide 3');
            });

            it('goes no further back than the first slide', function() {
                slideshow.previous();
                slideshow.previous();

                expect(slideshow.getCurrentSlide()).to.equal(0);
            });

            it('goes no further forward than the last slide', function() {
                slideshow.next();
                slideshow.next();
                slideshow.next();
                slideshow.next();
                slideshow.next();
                slideshow.next();

                expect(slideshow.getCurrentSlide()).to.equal(3);
            });

            it('can show a given slide', function() {
                slideshow.showSlide(2);

                expect(slideshow.getCurrentSlide()).to.equal(2);

                expect(getTexts('.current')).to.equal('Slide 2');
                expect(getTexts('.past')).to.equal('Slide 0, Slide 1');
                expect(getTexts('.future')).to.equal('Slide 3');
            });

        });

    });

});
