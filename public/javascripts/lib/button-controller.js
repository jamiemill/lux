(function($) {

    /**
     * This class controls a presentation with buttons.
     */

    var ButtonController = function(options) {
        this._presentation = options.presentation;
        this._baseElement = options.baseElement;
        var self = this;
        $('.next', this._baseElement).click(function(e) {self._onButtonClicked(e);});
        $('.previous', this._baseElement).click(function(e) {self._onButtonClicked(e);});
    };

    $.extend(ButtonController.prototype, {

        _presentation: null,

        _baseElement: null,

        _onButtonClicked: function(e) {
            e.preventDefault();
            if ($(e.target).hasClass('previous')) {
                this._presentation.previous();
            } else if ($(e.target).hasClass('next')) {
                this._presentation.next();
            }
            return false;
        }

    });

    window.ButtonController = ButtonController;

})(jQuery);
