(function($){

    /**
     * This class represents the actual presentation.  It encapsulates the
     * logic for:
     * - setting/maintaining the states of all slides.
     * - showing any given slide.
     * - transitioning to the next or previous slide.
     * It can be controlled by a public interface but does not listen for any
     * global user control.  It's kept as dumb as possible so that there can
     * potentially be several on a page at once.
     */

    var Presenter = function(options) {
        this._$baseEl = $(options.baseEl);
        this._init();
    };

    $.extend(Presenter.prototype, {

        _$baseEl: null,
        _slideCount: null,
        _currentSlide: 0,

        _init: function() {
            this._slideCount = this._$getSlides().length;
            this.showSlide(this._currentSlide);
            // Don't want transitions to be applied until initial states are set.
            // Do this on the next tick to prevent Chrome from animating on initial
            // pageload.
            var self = this;
            setTimeout(function() {self._$baseEl.addClass('enable-transitions');}, 0);
        },

        _updateSlideStates: function() {
            var self = this;
            this._$getSlides().each(function(i) {
                $(this).toggleClass('past', i < self._currentSlide);
                $(this).toggleClass('current', i === self._currentSlide);
                $(this).toggleClass('future', i > self._currentSlide);
            });
        },

        shiftSlides: function(proportion) {
            if (proportion === 0) {
                this._$getSlides().css({
                    '-webkit-transform': '',
                    '-moz-transform': '',
                    '-o-transform': '',
                    'transform': ''
                });
                return;
            }
            var self = this;
            $.each([-1,0,1], function(i, n) {
                var offset = proportion*100 + n*100;
                var setting = 'translate(' + offset + '%, 0px)';
                self._$getSlideByRelativeIndex(n).css({
                    '-webkit-transform': setting,
                    '-moz-transform': setting,
                    '-o-transform': setting,
                    'transform': setting
                });
            });
        },

        _$getSlideByRelativeIndex: function(delta) {
            var slide = this._currentSlide + delta;
            if (slide > this._slideCount-1 || slide < 0) {
                return $([]);
            }
            return this._$baseEl.find('.slide:eq(' + slide + ')');
        },

        next: function() {
            this.showSlide(this._currentSlide + 1);
        },

        previous: function() {
            this.showSlide(this._currentSlide - 1);
        },

        showSlide: function(number) {
            if (number > this._slideCount-1 || number < 0) {
                return;
            }
            this._currentSlide = number;
            this._$baseEl.trigger('slidechange', number);
            this._updateSlideStates();
        },

        _$getSlides: function() {
            return this._$baseEl.find('.slide');
        },

        swipeStarted: function() {
            this._$baseEl.removeClass('enable-transitions');
        },

        swipeStopped: function() {
            this._$baseEl.addClass('enable-transitions');
        }

    });

    window.Presenter = Presenter;

})(jQuery);
