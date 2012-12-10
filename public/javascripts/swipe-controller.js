(function($) {

    /**
     * This class controls a presentation with
     * swipe-like gestures with either mouse or touch.
     */

    var SWIPESTART_EVENT = 'touchstart.presenter mousedown.presenter';
    var SWIPEEND_EVENT = 'touchend.presenter mouseup.presenter';
    var SWIPEMOVE_EVENT = 'touchmove.presenter mousemove.presenter';

    var SwipeController = function(options) {
        this._presenter = options.presenter;
        var self = this;
        $('body').bind(SWIPESTART_EVENT, function(e) {self._onSwipeStart(e);});
        $('body').bind(SWIPEEND_EVENT, function(e) {self._onSwipeEnd(e);});
    };

    // Handles either mouse events or touch events respectively:
    var getXPos = function(e) {
        return e.screenX || e.originalEvent.changedTouches[0].screenX;
    };

    $.extend(SwipeController.prototype, {

        _presenter: null,

        _swipeStartPos: null,

        _toleranceForFullSwipe: 0.3,

        _onSwipeStart: function(e) {
            e.preventDefault();
            var self = this;
            this._swipeStartPos = getXPos(e);
            $('body').bind(SWIPEMOVE_EVENT, function(e) {self._onSwipeMove(e);});
            this._presenter.disableTransitions();
        },

        _onSwipeMove: function(e) {
            e.preventDefault();
            var offset = getXPos(e) - this._swipeStartPos;
            var proportion = offset/$(window).width();
            this._presenter.shiftSlides(proportion);
        },

        _onSwipeEnd: function(e) {
            e.preventDefault();
            $('body').unbind(SWIPEMOVE_EVENT);
            this._presenter.enableTransitions();
            var offset = getXPos(e) - this._swipeStartPos;
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
