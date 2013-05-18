define(['jquery'], function($) {

    var Autosizer = function(options) {
        this._slideshow = options.slideshow;
        this.$boundary = this._slideshow._$baseEl;
        this._sizeNow();
        var self = this;
        $(window).bind('resize.lux-autosizer', function() {
            self._sizeNow();
        });
    };

    $.extend(Autosizer.prototype, {

        _sizeNow: function() {
            var naturalWidth = 800;
            var naturalHeight = 500;
            var boundaryWidth = this.$boundary.width();
            var boundaryHeight = this.$boundary.height();

            var scale = Math.min(boundaryWidth/naturalWidth, boundaryHeight/naturalHeight);
            var xOffset = (boundaryWidth - naturalWidth*scale) / 2;
            var yOffset = (boundaryHeight - naturalHeight*scale) / 2;

            // .presentation can have any width/height externally set,
            // most likely 100% in both directions to fill the screen.
            // .slides will be scaled and moved to fit nicely inside the
            // presentation space while staying in proportion and keeping
            // everything visible.
            // TODO: may want a wrapper that represents the canvas that gets
            // translated instead of slides, so that other things (navigation bar)
            // can also be positioned within it.

            var translate = xOffset/scale + 'px, ' + yOffset/scale + 'px';

            this.$boundary.find('.slides').css({
                'transform': 'scale(' + scale + ') translate(' + translate + ')',
                'transform-origin': '0% 0%'
            });
        }

    });

    return Autosizer;

});
