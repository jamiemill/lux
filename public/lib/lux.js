define([
    'jquery',
    'lib/slideshow',
    'lib/keyboard-controller'
], function($, Slideshow, KeyboardController) {

    var Lux = {
        init: function() {
            var slideshow = new Slideshow({
                baseEl: $('.presentation:first')
            });
            new KeyboardController({
                slideshow: slideshow
            });
        }
    };

    return Lux;

});
