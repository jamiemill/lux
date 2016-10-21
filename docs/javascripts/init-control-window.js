// On page load

$(document).ready(function() {

    var presentation = window.parentWindowPresentation;

    var buttonController = new ButtonController({
        rootElement: $('.button-controller'),
        presentation: presentation
    });

    var keyboardController = new KeyboardController({
        presentation: presentation
    });

    renderProgress();
    presentation.bind('slide-changed', renderProgress);

    function renderProgress() {
        $('.current-slide-number').text(presentation.getCurrentSlide() + 1);
        $('.total-slide-count').text(presentation.getSlideCount());
    }

    $('.close').click(function() {
        presentation.unbind('slide-changed', renderProgress);
        window.close();
    });

});
