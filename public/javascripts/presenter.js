(function($){

    var KEY_RIGHT = 39;
    var KEY_LEFT = 37;

    // On page load

    $(document).ready(function() {
        window.mainPresentation = new Presenter({baseEl: $('.presentation')});
    });

    // The actual Presenter class

    var Presenter = function(options) {
        this.$baseEl = $(options.baseEl);
        this.init();
    };

    $.extend(Presenter.prototype, {

        $baseEl: null,
        slideCount: null,
        currentSlide: 0,

        init: function() {
            this.slideCount = this.$getSlides().length;
            this.render();
            var self = this;
            $('body').keyup(function(e) {self.onKeyUp(e);});
        },

        render: function() {
            // Base element should be wide enough to contain all slides
            this.$baseEl.find('.slides').width(this.getScreenWidth() * this.slideCount);
            // Each slide is as wide as the screen
            this.$getSlides().width(this.getScreenWidth());
            this.scrollToSlide(this.currentSlide, false);
        },

        scrollToSlide: function(number, animate) {
            this.currentSlide = number;
            // Whole base canvas should be offset to show only the current slide.
            var speed = animate ? 500 : 0;
            var offset = - this.currentSlide * this.getScreenWidth();
            this.$baseEl.find('.slides').animate({left: offset}, speed);
        },

        onKeyUp: function(e) {
            if (e.keyCode === KEY_LEFT) {
                this.previous();
                return false;
            } else if (e.keyCode === KEY_RIGHT) {
                this.next();
                return false;
            }
            return true;
        },

        next: function() {
            this.navigate(this.currentSlide + 1);
        },

        previous: function() {
            this.navigate(this.currentSlide - 1);
        },

        navigate: function(toSlide) {
            if (toSlide > this.slideCount-1 || toSlide < 0) {
                return;
            }
            this.scrollToSlide(toSlide, true);
        },

        $getSlides: function() {
            return this.$baseEl.find('.slide');
        },

        getScreenWidth: function() {
            return $(window).width();
        }
    });


})(jQuery);
