// On page load

$(document).ready(function() {
    $('code:not(.ugly),pre:not(.ugly)').addClass('prettyprint');
    prettyPrint();

    var presentation = new Presentation({
        baseEl: $('.presentation')
    });

    var keyboardController = new KeyboardController({
        presentation: presentation
    });

    var swipeController = new SwipeController({
        presentation: presentation
    });

    var urlBinder = new UrlBinder({
        presentation: presentation,
        baseEl: $('.presentation')
    });

});
