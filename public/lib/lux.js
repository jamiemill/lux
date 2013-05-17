define([
    'jquery',
    'lib/slideshow',
    'lib/keyboard-controller',
    'lib/autosizer'
], function($, Slideshow, KeyboardController, Autosizer) {

    var Lux = {
        init: function() {
            var slideshow = new Slideshow({
                baseEl: $('.presentation:first')
            });
            new KeyboardController({
                slideshow: slideshow
            });
            new Autosizer({
                slideshow: slideshow
            });
        }
    };

    return Lux;

});
