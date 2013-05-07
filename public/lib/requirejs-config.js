requirejs.config({
    paths: {
        jQuery: 'components/jquery-1.8.3.min',
        MicroEvent: 'components/microevent',
        chai: 'components/chai',
        sinon: 'components/sinon-1.6.0',
        'sinon-chai': 'components/sinon-chai',
        isolate: 'components/isolate'
    },
    shim: {
        jQuery: {
            exports: 'jQuery'
        },
        MicroEvent: {
            exports: 'MicroEvent'
        },
        sinon: {
            exports: 'sinon'
        }
    }
});
