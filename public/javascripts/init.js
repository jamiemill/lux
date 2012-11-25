// On page load

$(document).ready(function() {
    $('code,pre').addClass('prettyprint');
    prettyPrint();

    var presenter = new Presenter({
        baseEl: $('.presentation')
    });

    var keyboardController = new KeyboardController({
        presenter: presenter
    });

});
