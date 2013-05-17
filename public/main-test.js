requirejs.config({
    baseUrl: '/base/public/'
});

require(['isolate', 'sinon'], function(isolate, sinon) {

    isolate.mapAsFactory(
        'lib/slideshow',
        function() { return sinon.spy(); }
    );
    isolate.mapAsFactory(
        'lib/keyboard-controller',
        function() { return sinon.spy(); }
    );
    isolate.mapAsFactory(
        'lib/autosizer',
        function() { return sinon.spy(); }
    );

    isolate.passthru([
        'jquery',
        'MicroEvent',
        'chai',
        'sinon',
        'sinon-chai',
        /\.spec/
    ]);

    require([
        'test/lux.spec',
        'test/slideshow.spec',
        'test/keyboard-controller.spec',
        'test/autosizer.spec'
    ], function(){
        window.__karma__.start();
    });
});
