// On page load

$(document).ready(function() {
    window.mainPresentation = new Presenter({baseEl: $('.presentation')});
    $('code,pre').addClass('prettyprint');
    prettyPrint();
});
