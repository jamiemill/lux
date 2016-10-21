requirejs.config({
    paths: {
        jquery: 'components/jquery-1.8.3.min',
        MicroEvent: 'components/microevent',
        chai: 'components/chai',
        sinon: 'components/sinon-1.6.0',
        'sinon-chai': 'components/sinon-chai',
        isolate: 'components/isolate',
        'chai-jquery': 'components/chai-jquery'
    },
    shim: {
        jquery: {
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
