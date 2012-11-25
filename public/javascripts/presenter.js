(function($){

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
            var slideFromURL = jQuery.bbq.getState('slide', true);
            if (slideFromURL) {
                this._currentSlide = slideFromURL - 1;
            }
            this._render();
            var self = this;
            $(window).resize(function() {self._render();});
            $(window).bind('hashchange', function() {self._onHashChange();});
        },

        _render: function() {
            this.showSlide(this._currentSlide);
            // Do this on the next tick to prevent Chrome from animating on initial
            // pageload.
            var self = this;
            setTimeout(function() {self._$baseEl.addClass('states-set');}, 0);
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

        _onHashChange: function() {
            var slide = jQuery.bbq.getState('slide', true);
            if (slide) {
                this.showSlide(slide - 1);
            }
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
            jQuery.bbq.pushState({slide: number + 1});
            this._updateSlideStates();
        },

        _$getSlides: function() {
            return this._$baseEl.find('.slide');
        },

        swipeStarted: function() {
            this._$getSlides().addClass('dragging');
        },

        swipeStopped: function() {
            this._$getSlides().removeClass('dragging');
        }

    });

    // Export this class
    window.Presenter = Presenter;


})(jQuery);
