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
            this.$getCurrentSlide().addClass('dragging');
            return false;
        },

        onSwipeEnd: function(e) {
            e.preventDefault();
            this.swipeStartPos = null;
            $('body').unbind('mousemove.presenter');
            this.$getCurrentSlide().removeClass('dragging');
            return false;
        },

        onSwipeMove: function(e) {
            e.preventDefault();
            console.log(e);
            var offset = e.screenX - this.swipeStartPos;
            if (offset > 0) {
                // user is swiping rightwards
            } else {
                // user is swiping leftwards
            }
            this.$getCurrentSlide().css({
                '-webkit-transform': 'translate('+offset+'px,0px)',
                '-moz-transform': 'translate('+offset+'px,0px)',
                '-o-transform': 'translate('+offset+'px,0px)',
                'transform': 'translate('+offset+'px,0px)'
            });
            return false;
        },

        $getCurrentSlide: function() {
            return this.$baseEl.find('.slide:eq('+this.currentSlide+')');
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
