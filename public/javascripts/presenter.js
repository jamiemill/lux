(function($){

    var KEY_RIGHT = 39;
    var KEY_LEFT = 37;

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

        init: function() {
            this.slideCount = this.$getSlides().length;
            var slideFromURL = jQuery.bbq.getState('slide', true);
            if (slideFromURL) {
                this.currentSlide = slideFromURL - 1;
            }
            this.render();
            var self = this;
            $('body').keyup(function(e) {self.onKeyUp(e);});
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
            } else if (e.keyCode === KEY_RIGHT) {
                e.preventDefault();
                this.next();
                return false;
            }
            return true;
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
