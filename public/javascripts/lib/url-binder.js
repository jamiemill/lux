(function($) {

    var Presenteur = window.Presenteur = window.Presenteur || {};

    /**
     * This class can link a presentation to the URL
     * and:
     * - update the URL fragment when the current slide changes
     * - update the presentation when the URL fragment changes
     *   (e.g. when user presses back, forward, or changes URL)
     * - navigates the presentation to the initial slide by checking
     *   the URL on load.
     */

    var UrlBinder = function(options) {

        this._presentation = options.presentation;
        this._$baseEl = $(options.baseEl);

        var slideFromURL = jQuery.bbq.getState('slide', true);
        if (slideFromURL) {
            this._presentation.showSlide(slideFromURL - 1);
        }

        var self = this;
        $(window).bind('hashchange', function() {self._onHashChange();});
        this._$baseEl.bind('slidechange', this._onSlideChange);
    };

    $.extend(UrlBinder.prototype, {

        _presentation: null,

        _$baseEl: null,

        _onHashChange: function() {
            var slide = jQuery.bbq.getState('slide', true);
            if (slide) {
                this._presentation.showSlide(slide - 1);
            }
        },

        _onSlideChange: function(e, number) {
            jQuery.bbq.pushState({slide: number + 1});
        }

    });

    Presenteur.UrlBinder = UrlBinder;

})(jQuery);
