define(['jquery', 'MicroEvent'], function($, MicroEvent) {

    /**
     * This class represents the actual slideshow.  It encapsulates the
     * logic for:
     * - setting/maintaining the states of all slides.
     * - showing any given slide.
     * - transitioning to the next or previous slide.
     * It can be controlled by a public interface but does not listen for any
     * global user control.  It's kept as dumb as possible so that there can
     * potentially be several on a page at once.
     */

    var Slideshow = function(options) {
        this._$baseEl = $(options.baseEl);
        this._init();
    };

    $.extend(Slideshow.prototype, MicroEvent.prototype, {

        _$baseEl: null,
        _slideCount: null,
        _currentSlide: 0,

        _init: function() {
            this._slideCount = this._$getSlides().length;
            this.showSlide(this._currentSlide);
        },

        _updateSlideStates: function() {
            var self = this;
            this._$getSlides().each(function(i) {
                $(this).toggleClass('past', i < self._currentSlide);
                $(this).toggleClass('current', i === self._currentSlide);
                $(this).toggleClass('future', i > self._currentSlide);
            });
        },

        _$getSlides: function() {
            return this._$baseEl.find('.slide');
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
            this.trigger('slide-changed', {
                currentSlide: this._currentSlide,
                slideCount: this._slideCount
            });
        },

        disableTransitions: function() {
            this._$baseEl.removeClass('enable-transitions');
        },

        enableTransitions: function() {
            this._$baseEl.addClass('enable-transitions');
        },

        getCurrentSlide: function() {
            return this._currentSlide;
        },

        getSlideCount: function() {
            return this._slideCount;
        }

    });

    return Slideshow;

});
