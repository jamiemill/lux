(function($, chai) {
    var expect = chai.expect;

    var Presenteur = window.Presenteur = window.Presenteur || {};

    describe('Presentation', function() {

        var presentation,
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
            presentation = new Presenteur.Presentation({
                baseEl: $htmlFixture
            });
        });

        describe('Initialisation', function() {

            it('should recognise two slides', function() {
                expect(presentation.getSlideCount()).to.equal(4);
            });

            it('should start on slide 0', function() {
                expect(presentation.getCurrentSlide()).to.equal(0);
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
                presentation.next();

                expect(presentation.getCurrentSlide()).to.equal(1);

                expect(getTexts('.current')).to.equal('Slide 1');
                expect(getTexts('.past')).to.equal('Slide 0');
                expect(getTexts('.future')).to.equal('Slide 2, Slide 3');
            });

            it('goes back when previous is called', function() {
                presentation.next();
                presentation.previous();

                expect(presentation.getCurrentSlide()).to.equal(0);

                expect(getTexts('.current')).to.equal('Slide 0');
                expect(getTexts('.past')).to.equal('');
                expect(getTexts('.future')).to.equal('Slide 1, Slide 2, Slide 3');
            });

            it('goes no further back than the first slide', function() {
                presentation.previous();
                presentation.previous();

                expect(presentation.getCurrentSlide()).to.equal(0);
            });

            it('goes no further forward than the last slide', function() {
                presentation.next();
                presentation.next();
                presentation.next();
                presentation.next();
                presentation.next();
                presentation.next();

                expect(presentation.getCurrentSlide()).to.equal(3);
            });

            it('can show a given slide', function() {
                presentation.showSlide(2);

                expect(presentation.getCurrentSlide()).to.equal(2);

                expect(getTexts('.current')).to.equal('Slide 2');
                expect(getTexts('.past')).to.equal('Slide 0, Slide 1');
                expect(getTexts('.future')).to.equal('Slide 3');
            });

        });

    });

})(jQuery, window.chai);
