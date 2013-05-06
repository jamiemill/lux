requirejs.config({
    baseUrl: '/base/public/'
});

require([
    'lib/presenteur',
    'test/lib/presenteur/presenteur.spec',
    'test/lib/presenteur/slideshow.spec',
    'test/lib/presenteur/keyboard-controller.spec'
], function(){
    window.__karma__.start();
});
