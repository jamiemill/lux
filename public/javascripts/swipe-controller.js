(function($) {

    var SwipeController = function(options) {
        this._presenter = options.presenter;
        var self = this;
        $('body').mousedown(function(e) {self._onSwipeStart(e);});
        $('body').mouseup(function(e) {self._onSwipeEnd(e);});
    };

    $.extend(SwipeController.prototype, {

        _presenter: null,

        _swipeStartPos: null,

        _toleranceForFullSwipe: 0.3,

        _onSwipeStart: function(e) {
            e.preventDefault();
            var self = this;
            this._swipeStartPos = e.screenX;
            $('body').bind('mousemove.presenter', function(e) {self._onSwipeMove(e);});
            this._presenter.swipeStarted();
        },

        _onSwipeEnd: function(e) {
            e.preventDefault();
            $('body').unbind('mousemove.presenter');
            this._presenter.swipeStopped();
            var offset = e.screenX - this._swipeStartPos;
            if (offset > this._toleranceForFullSwipe*$(window).width()) {
                this._presenter.previous();
            } else if (offset < -this._toleranceForFullSwipe*$(window).width()) {
                this._presenter.next();
            }
            this._presenter.shiftSlides(0);
        },

        _onSwipeMove: function(e) {
            e.preventDefault();
            var offset = e.screenX - this._swipeStartPos;
            var proportion = offset/$(window).width();
            this._presenter.shiftSlides(proportion);
        }

    });

    window.SwipeController = SwipeController;

})(jQuery);
