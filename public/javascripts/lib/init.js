(function($) {

    var Presenteur = window.Presenteur = window.Presenteur || {};

    $(document).ready(function() {
        //$('code:not(.ugly),pre:not(.ugly)').addClass('prettyprint');
        //prettyPrint();

        var presentation = new Presenteur.Presentation({
            baseEl: $('.presentation')
        });

        //$(window).resize(function() {
            //presentation.scaleToFit();
        //});

        //var keyboardController = new Presenteur.KeyboardController({
            //presentation: presentation
        //});

        //var swipeController = new Presenteur.SwipeController({
            //presentation: presentation
        //});

        //var urlBinder = new Presenteur.UrlBinder({
            //presentation: presentation,
            //baseEl: $('.presentation')
        //});

        // Summon the Popup Controller, for controlling presentation on separate screen
        // of same computer.
        // TODO: move this into a control object. Could include chapter navigation.

        //$('<button>Control Window</button>')
            //.appendTo('body')
            //.click(function() {
                //window.open(
                    //'./popup-controller.html',
                    //'pres-popup-controller',
                    //'height=200,width=300,status=no,toolbar=no,menu=no,location=no,dependent=yes'
                //).parentWindowPresentation = presentation;
            //});

        // Remote Control for controlling/being controlled over a network.

        // TODO: not robust, set window variable instead
        //var isMaster = window.location.pathname.indexOf('master') !== -1;
        //var socket = io.connect();
        //if (isMaster) {
            //presentation.bind('slide-changed', function(data) {
                //socket.emit('master-slide-changed', data);
            //});
        //} else {
            //socket.on('slide-change', function (data) {
                //presentation.showSlide(data.currentSlide);
            //});
        //}

    });
})(jQuery);
