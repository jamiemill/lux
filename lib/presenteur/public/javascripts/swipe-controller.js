(function($) {

    /**
     * This class controls a presentation with
     * swipe-like gestures with either mouse or touch.
     */

    var SWIPESTART_EVENT = 'touchstart.presentation mousedown.presentation';
    var SWIPEEND_EVENT = 'touchend.presentation mouseup.presentation';
    var SWIPEMOVE_EVENT = 'touchmove.presentation mousemove.presentation';

    var SwipeController = function(options) {
        this._presentation = options.presentation;
        var self = this;
        $('body').bind(SWIPESTART_EVENT, function(e) {self._onSwipeStart(e);});
        $('body').bind(SWIPEEND_EVENT, function(e) {self._onSwipeEnd(e);});
    };

    // Handles either mouse events or touch events respectively:
    var getXPos = function(e) {
        return e.screenX || e.originalEvent.changedTouches[0].screenX;
    };

    $.extend(SwipeController.prototype, {

        _presentation: null,

        _swipeStartPos: null,

        _toleranceForFullSwipe: 0.3,

        _onSwipeStart: function(e) {
            e.preventDefault();
            var self = this;
            this._swipeStartPos = getXPos(e);
            $('body').bind(SWIPEMOVE_EVENT, function(e) {self._onSwipeMove(e);});
            this._presentation.disableTransitions();
        },

        _onSwipeMove: function(e) {
            e.preventDefault();
            var offset = getXPos(e) - this._swipeStartPos;
            var proportion = offset/$(window).width();
            this._presentation.shiftSlides(proportion);
        },

        _onSwipeEnd: function(e) {
            e.preventDefault();
            $('body').unbind(SWIPEMOVE_EVENT);
            this._presentation.enableTransitions();
            var offset = getXPos(e) - this._swipeStartPos;
            if (offset > this._toleranceForFullSwipe*$(window).width()) {
                this._presentation.previous();
            } else if (offset < -this._toleranceForFullSwipe*$(window).width()) {
                this._presentation.next();
            }
            this._presentation.shiftSlides(0);
        }

    });

    window.SwipeController = SwipeController;

})(jQuery);
