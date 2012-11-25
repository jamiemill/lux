(function($){

    var KEY_RIGHT = 39;
    var KEY_LEFT = 37;
    var KEY_SPACE = 32;

    // On page load

    $(document).ready(function() {
        window.mainPresentation = new Presenter({baseEl: $('.presentation')});
        $('code,pre').addClass('prettyprint');
        prettyPrint();
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

        swipeStartPos: null,

        init: function() {
            this.slideCount = this.$getSlides().length;
            var slideFromURL = jQuery.bbq.getState('slide', true);
            if (slideFromURL) {
                this.currentSlide = slideFromURL - 1;
            }
            this.render();
            var self = this;
            $('body').keyup(function(e) {self.onKeyUp(e);});
            $('body').mousedown(function(e) {self.onSwipeStart(e);});
            $('body').mouseup(function(e) {self.onSwipeEnd(e);});
            $(window).resize(function() {self.render();});
            $(window).bind('hashchange', function() {self.onHashChange();});
        },

        render: function() {
            this.showSlide(this.currentSlide);
            // Do this on the next tick to prevent Chrome from animating on initial
            // pageload.
            var self = this;
            setTimeout(function() {self.$baseEl.addClass('states-set');}, 0);
        },

        showSlide: function(number) {
            this.currentSlide = number;
            jQuery.bbq.pushState({slide: number + 1});
            this.updateSlideStates();
        },

        updateSlideStates: function() {
            var self = this;
            this.$getSlides().each(function(i) {
                $(this).toggleClass('past', i < self.currentSlide);
                $(this).toggleClass('current', i === self.currentSlide);
                $(this).toggleClass('future', i > self.currentSlide);
            });
        },

        onKeyUp: function(e) {
            if (e.keyCode === KEY_LEFT) {
                e.preventDefault();
                this.previous();
                return false;
            } else if (e.keyCode === KEY_RIGHT || e.keyCode === KEY_SPACE) {
                e.preventDefault();
                this.next();
                return false;
            }
            return true;
        },

        onSwipeStart: function(e) {
            var self = this;
            e.preventDefault();
            this.swipeStartPos = e.screenX;
            $('body').bind('mousemove.presenter', function(e) {self.onSwipeMove(e);});
            this.$getSlides().addClass('dragging');
            return false;
        },

        onSwipeEnd: function(e) {
            e.preventDefault();
            $('body').unbind('mousemove.presenter');
            this.$getSlides().removeClass('dragging');
            var offset = e.screenX - this.swipeStartPos;
            var toleranceForFullSwipe = 0.3;
            if (offset > toleranceForFullSwipe*$(window).width()) {
                // user achieved full swipe right
                this.previous();
            } else if (offset < -toleranceForFullSwipe*$(window).width()) {
                // user achieved full swipe left
                this.next();
            }
            this.$getSlides().css({
                '-webkit-transform': '',
                '-moz-transform': '',
                '-o-transform': '',
                'transform': ''
            });
            this.swipeStartPos = null;
            return false;
        },

        onSwipeMove: function(e) {
            e.preventDefault();
            var offset = e.screenX - this.swipeStartPos;
            var pctOffset = offset/$(window).width()*100;
            this.moveSlides(pctOffset);
            return false;
        },

        moveSlides: function(pctOffset) {
            var self = this;
            $.each([-1,0,1], function(i, n) {
                var offset = pctOffset + n*100;
                self.$getSlideByRelativeIndex(n).css({
                    '-webkit-transform': 'translate('+offset+'%,0px)',
                    '-moz-transform': 'translate('+offset+'%,0px)',
                    '-o-transform': 'translate('+offset+'%,0px)',
                    'transform': 'translate('+offset+'%,0px)'
                });
            });
        },

        $getSlideByRelativeIndex: function(delta) {
            var slide = this.currentSlide + delta;
            if (slide > this.slideCount-1 || slide < 0) {
                return $([]);
            }
            return this.$baseEl.find('.slide:eq(' + slide + ')');
        },

        onHashChange: function() {
            var slide = jQuery.bbq.getState('slide', true);
            if (slide) {
                this.showSlide(slide - 1);
            }
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
            this.showSlide(toSlide);
        },

        $getSlides: function() {
            return this.$baseEl.find('.slide');
        }

    });


})(jQuery);
