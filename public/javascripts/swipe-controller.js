(function($) {

    /**
     * This class controls a presentation with
     * swipe-like gestures.
     * TODO: Make it work with touch events instead of mouse.
     */

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
            this._presenter.disableTransitions();
        },

        _onSwipeMove: function(e) {
            e.preventDefault();
            var offset = e.screenX - this._swipeStartPos;
            var proportion = offset/$(window).width();
            this._presenter.shiftSlides(proportion);
        },

        _onSwipeEnd: function(e) {
            e.preventDefault();
            $('body').unbind('mousemove.presenter');
            this._presenter.enableTransitions();
            var offset = e.screenX - this._swipeStartPos;
            if (offset > this._toleranceForFullSwipe*$(window).width()) {
                this._presenter.previous();
            } else if (offset < -this._toleranceForFullSwipe*$(window).width()) {
                this._presenter.next();
            }
            this._presenter.shiftSlides(0);
        }

    });

    window.SwipeController = SwipeController;

})(jQuery);
