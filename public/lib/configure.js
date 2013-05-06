var scriptTags = document.getElementsByTagName('script');
var baseUrl = scriptTags[scriptTags.length-1].src.replace(/lib\/.*$/, '');

requirejs.config({
    baseUrl: baseUrl,
    paths: {
        jQuery: 'components/jquery-1.8.3.min',
        MicroEvent: 'components/microevent',
        chai: 'components/chai',
        sinon: 'components/sinon-1.6.0'
    },
    shim: {
        jQuery: {
            exports: 'jQuery'
        },
        MicroEvent: {
            exports: 'MicroEvent'
        }
    }
});
