/*
(function($) {

    var Presenteur = window.Presenteur;

    $(document).ready(function() {

        var slideshow = window.parentWindowSlideshow;

        new Presenteur.ButtonController({
            rootElement: $('.button-controller'),
            slideshow: slideshow
        });

        new Presenteur.KeyboardController({
            slideshow: slideshow
        });

        renderProgress();
        slideshow.bind('slide-changed', renderProgress);

        function renderProgress() {
            $('.current-slide-number').text(slideshow.getCurrentSlide() + 1);
            $('.total-slide-count').text(slideshow.getSlideCount());
        }

        $('.close').click(function() {
            slideshow.unbind('slide-changed', renderProgress);
            window.close();
        });

    });

})(jQuery);
*/
