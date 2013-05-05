(function($) {

    var Presenteur = window.Presenteur = window.Presenteur || {};

    $(document).ready(function() {
        //$('code:not(.ugly),pre:not(.ugly)').addClass('prettyprint');
        //prettyPrint();

        new Presenteur.Slideshow({
            baseEl: $('.presentation')
        });

        //$(window).resize(function() {
            //slideshow.scaleToFit();
        //});

        //var keyboardController = new Presenteur.KeyboardController({
            //slideshow: slideshow
        //});

        //var swipeController = new Presenteur.SwipeController({
            //slideshow: slideshow
        //});

        //var urlBinder = new Presenteur.UrlBinder({
            //slideshow: slideshow,
            //baseEl: $('.presentation')
        //});

        // Summon the Popup Controller, for controlling slideshow on separate screen
        // of same computer.
        // TODO: move this into a control object. Could include chapter navigation.

        //$('<button>Control Window</button>')
            //.appendTo('body')
            //.click(function() {
                //window.open(
                    //'./popup-controller.html',
                    //'pres-popup-controller',
                    //'height=200,width=300,status=no,toolbar=no,menu=no,location=no,dependent=yes'
                //).parentWindowSlideshow = slideshow;
            //});

        // Remote Control for controlling/being controlled over a network.

        // TODO: not robust, set window variable instead
        //var isMaster = window.location.pathname.indexOf('master') !== -1;
        //var socket = io.connect();
        //if (isMaster) {
            //slideshow.bind('slide-changed', function(data) {
                //socket.emit('master-slide-changed', data);
            //});
        //} else {
            //socket.on('slide-change', function (data) {
                //slideshow.showSlide(data.currentSlide);
            //});
        //}

    });
})(jQuery);
