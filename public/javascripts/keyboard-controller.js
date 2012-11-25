(function($) {

    var KEY_RIGHT = 39;
    var KEY_LEFT = 37;
    var KEY_SPACE = 32;

    var KeyboardController = function(options) {
        this._presenter = options.presenter;
        var self = this;
        $('body').keyup(function(e) {self._onKeyUp(e);});
    };

    $.extend(KeyboardController.prototype, {

        _presenter: null,

        _onKeyUp: function(e) {
            if (e.keyCode === KEY_LEFT) {
                e.preventDefault();
                this._presenter.previous();
                return false;
            } else if (e.keyCode === KEY_RIGHT || e.keyCode === KEY_SPACE) {
                e.preventDefault();
                this._presenter.next();
                return false;
            }
            return true;
        }

    });

    window.KeyboardController = KeyboardController;

})(jQuery);
