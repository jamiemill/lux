(function($) {

    var UrlBinder = function(options) {
        this._presenter = options.presenter;
        this._$baseEl = $(options.baseEl);
        var slideFromURL = jQuery.bbq.getState('slide', true);
        if (slideFromURL) {
            this._presenter.showSlide(slideFromURL - 1);
        }
        var self = this;
        $(window).bind('hashchange', function() {self._onHashChange();});
        this._$baseEl.bind('slidechange', function(e, number) {
            jQuery.bbq.pushState({slide: number + 1});
        });
    };

    $.extend(UrlBinder.prototype, {

        _presenter: null,

        _$baseEl: null,

        _onHashChange: function() {
            var slide = jQuery.bbq.getState('slide', true);
            if (slide) {
                this._presenter.showSlide(slide - 1);
            }
        }

    });

    window.UrlBinder = UrlBinder;

})(jQuery);
