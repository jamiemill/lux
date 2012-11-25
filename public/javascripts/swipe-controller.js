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

        _onSwipeStart: function(e) {
            var self = this;
            e.preventDefault();
            this._swipeStartPos = e.screenX;
            $('body').bind('mousemove.presenter', function(e) {self._onSwipeMove(e);});
            this._presenter._$getSlides().addClass('dragging');
            return false;
        },

        _onSwipeEnd: function(e) {
            e.preventDefault();
            $('body').unbind('mousemove.presenter');
            this._presenter._$getSlides().removeClass('dragging');
            var offset = e.screenX - this._swipeStartPos;
            var toleranceForFullSwipe = 0.3;
            if (offset > toleranceForFullSwipe*$(window).width()) {
                // user achieved full swipe right
                this._presenter.previous();
            } else if (offset < -toleranceForFullSwipe*$(window).width()) {
                // user achieved full swipe left
                this._presenter.next();
            }
            this._presenter._$getSlides().css({
                '-webkit-transform': '',
                '-moz-transform': '',
                '-o-transform': '',
                'transform': ''
            });
            this._swipeStartPos = null;
            return false;
        },

        _onSwipeMove: function(e) {
            e.preventDefault();
            var offset = e.screenX - this._swipeStartPos;
            var pctOffset = offset/$(window).width()*100;
            this._presenter._moveSlides(pctOffset);
            return false;
        }

    });

    window.SwipeController = SwipeController;

})(jQuery);
