define([
    'jQuery',
    'lib/slideshow'
], function($, Slideshow) {

    var Presenteur = {
        init: function() {
            window.slideshow = new Slideshow({
                baseEl: $('.presentation:first')
            });
        }
    };

    return Presenteur;

});
