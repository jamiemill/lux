// On page load

$(document).ready(function() {

    var buttonController = new ButtonController({
        rootElement: $('.button-controller'),
        presentation: window.parentWindowPresentation
    });

    var keyboardController = new KeyboardController({
        presentation: window.parentWindowPresentation
    });

    $('.close').click(function() {
        window.close();
    });

});
