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

    // TODO: move this into a control object. Could include chapter navigation.
    var $controlWindowButton = $('<button>Control Window</button>');
    $('body').append($controlWindowButton);
    $controlWindowButton.click(function() {
        var controlWindow = window.open(
            '/control',
            'pres-controller',
            'height=200,width=300,status=no,toolbar=no,menu=no,location=no,dependent=yes'
        );
        controlWindow.parentWindowPresentation = presentation;
    });

});
