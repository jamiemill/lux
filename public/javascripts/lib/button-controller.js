(function($) {

    var Presenteur = window.Presenteur = window.Presenteur || {};

    /**
     * This class controls a slideshow with buttons.
     */

    var ButtonController = function(options) {
        this._slideshow = options.slideshow;
        this._baseElement = options.baseElement;
        var self = this;
        $('.next', this._baseElement).click(function(e) {self._onButtonClicked(e);});
        $('.previous', this._baseElement).click(function(e) {self._onButtonClicked(e);});
    };

    $.extend(ButtonController.prototype, {

        _slideshow: null,

        _baseElement: null,

        _onButtonClicked: function(e) {
            e.preventDefault();
            if ($(e.target).hasClass('previous')) {
                this._slideshow.previous();
            } else if ($(e.target).hasClass('next')) {
                this._slideshow.next();
            }
            return false;
        }

    });

    Presenteur.ButtonController = ButtonController;

})(jQuery);
