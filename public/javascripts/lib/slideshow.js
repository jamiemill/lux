(function($){

    var Presenteur = window.Presenteur = window.Presenteur || {};

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

    $.extend(Slideshow.prototype, window.MicroEvent.prototype, {

        _$baseEl: null,
        _slideCount: null,
        _currentSlide: 0,

        _init: function() {
            //this.scaleToFit();
            this._slideCount = this._$getSlides().length;
            this.showSlide(this._currentSlide);
            //// Don't want transitions to be applied until initial states are set.
            //// Do this on the next tick to prevent Chrome from animating on initial
            //// pageload.
            //var self = this;
            //setTimeout(function() {
                //self._$baseEl.addClass('enable-transitions');
            //}, 1);
        },

        //scaleToFit: function() {
            //var referenceWidth = 1400;
            //var referenceHeight = 800;
            //var width = this._$baseEl.width();
            //var height = this._$baseEl.height();
            //var scale = Math.min(width/referenceWidth, height/referenceHeight);
            //this._$baseEl.css({
                //'font-size': scale*100 + '%'
            //});
        //},

        _updateSlideStates: function() {
            var self = this;
            this._$getSlides().each(function(i) {
                $(this).toggleClass('past', i < self._currentSlide);
                $(this).toggleClass('current', i === self._currentSlide);
                $(this).toggleClass('future', i > self._currentSlide);
            });
        },

        //_$getSlideByRelativeIndex: function(delta) {
            //var slide = this._currentSlide + delta;
            //if (slide > this._slideCount-1 || slide < 0) {
                //return $([]);
            //}
            //return this._$baseEl.find('.slide:eq(' + slide + ')');
        //},

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

        /**
         * Shift current, previous and next slides (if they exist) left or
         * right by proportion of screen width.
         *
         * This can be used to animate a transition frame-by-frame.
         *
         * It's used by the SwipeController to make the transition follow the
         * swipe gesture.
         *
         * NOTE: Before calling this, first call `disableTransitions` otherwise
         * the normal CSS3 transitions will also try to animate and cause
         * lagginess. Then call `enableTransitions` afterwards.
         */

        //shiftSlides: function(proportion) {
            //if (proportion === 0) {
                //this._$getSlides().css({
                    //'-webkit-transform': '',
                    //'-moz-transform': '',
                    //'-o-transform': '',
                    //'transform': ''
                //});
                //return;
            //}
            //var self = this;
            //$.each([-1,0,1], function(i, n) {
                //var offset = proportion*100 + n*100;
                //var setting = 'translate(' + offset + '%, 0px)';
                //self._$getSlideByRelativeIndex(n).css({
                    //'-webkit-transform': setting,
                    //'-moz-transform': setting,
                    //'-o-transform': setting,
                    //'transform': setting
                //});
            //});
        //},

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

    Presenteur.Slideshow = Slideshow;

})(jQuery);
