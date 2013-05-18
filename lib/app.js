var express = require('express'),
    renderer = require('./renderer');

exports.createApp = function(options) {
    return new App(options);
};

function App(options) {
    var self = this;
    options = options || {};
    this.port = options.port || 3000;
    this.directory = options.directory || './';
    this.stdout = options.stdout || process.stdout;

    var app = express();
    app.configure(function(){
        app.set('port', self.port);
        app.use(app.router);
        app.use(require('less-middleware')({ src: __dirname + '/../public' }));
        app.use(express.static(options.directory + '/public'));
        app.use(express.static(__dirname + '/../public'));
        app.use(express.errorHandler());
    });
    app.get('/', function(req, res) {
        self._serveIndexPage(req, res);
    });
    this.app = app;

    this.renderer = renderer.create({
        directory: this.directory,
        stdout: this.stdout
    });
}

App.prototype._serveIndexPage = function(req, res) {
    this.renderer.getIndexPage().then(function(html) {
        res.send(html);
    }).end();
};

