(function($) {

    var Presenteur = window.Presenteur = window.Presenteur || {};

    /**
     * This class controls a slideshow with
     * swipe-like gestures with either mouse or touch.
     */

    var SWIPESTART_EVENT = 'touchstart.slideshow mousedown.slideshow';
    var SWIPEEND_EVENT = 'touchend.slideshow mouseup.slideshow';
    var SWIPEMOVE_EVENT = 'touchmove.slideshow mousemove.slideshow';

    var SwipeController = function(options) {
        this._slideshow = options.slideshow;
        var self = this;
        $('body').bind(SWIPESTART_EVENT, function(e) {self._onSwipeStart(e);});
        $('body').bind(SWIPEEND_EVENT, function(e) {self._onSwipeEnd(e);});
    };

    // Handles either mouse events or touch events respectively:
    var getXPos = function(e) {
        return e.screenX || e.originalEvent.changedTouches[0].screenX;
    };

    $.extend(SwipeController.prototype, {

        _slideshow: null,

        _swipeStartPos: null,

        _toleranceForFullSwipe: 0.3,

        _onSwipeStart: function(e) {
            e.preventDefault();
            var self = this;
            this._swipeStartPos = getXPos(e);
            $('body').bind(SWIPEMOVE_EVENT, function(e) {self._onSwipeMove(e);});
            this._slideshow.disableTransitions();
        },

        _onSwipeMove: function(e) {
            e.preventDefault();
            var offset = getXPos(e) - this._swipeStartPos;
            var proportion = offset/$(window).width();
            this._slideshow.shiftSlides(proportion);
        },

        _onSwipeEnd: function(e) {
            e.preventDefault();
            $('body').unbind(SWIPEMOVE_EVENT);
            this._slideshow.enableTransitions();
            var offset = getXPos(e) - this._swipeStartPos;
            if (offset > this._toleranceForFullSwipe*$(window).width()) {
                this._slideshow.previous();
            } else if (offset < -this._toleranceForFullSwipe*$(window).width()) {
                this._slideshow.next();
            }
            this._slideshow.shiftSlides(0);
        }

    });

    Presenteur.SwipeController = SwipeController;

})(jQuery);
