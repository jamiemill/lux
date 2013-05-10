define([
    'jQuery',
    'lib/slideshow',
    'lib/keyboard-controller'
], function($, Slideshow, KeyboardController) {

    var Presenteur = {
        init: function() {
            var slideshow = new Slideshow({
                baseEl: $('.presentation:first')
            });
            new KeyboardController({
                slideshow: slideshow
            });
        }
    };

    return Presenteur;

});
