(function($) {

    /**
     * This class controls a presentation with keyboard
     * events:
     * - left/right arrow keys to go back/forward
     * - spacebar to go forward
     */

    var KEY_RIGHT = 39;
    var KEY_LEFT = 37;
    var KEY_SPACE = 32;

    var KeyboardController = function(options) {
        this._presentation = options.presentation;
        var self = this;
        $('body').keyup(function(e) {self._onKeyUp(e);});
    };

    $.extend(KeyboardController.prototype, {

        _presentation: null,

        _onKeyUp: function(e) {
            if (e.keyCode === KEY_LEFT) {
                e.preventDefault();
                this._presentation.previous();
            } else if (e.keyCode === KEY_RIGHT || e.keyCode === KEY_SPACE) {
                e.preventDefault();
                this._presentation.next();
            }
            return true;
        }

    });

    window.KeyboardController = KeyboardController;

})(jQuery);
