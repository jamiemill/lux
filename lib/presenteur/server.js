/*
 * TODO: Split this into server and app
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    os = require('os'),
    socketio = require('socket.io'),
    renderer = require('./renderer');

exports.getServer = getServer;

function Server(options) {
    options = options || {};
    this.port = options.port || 3000;
    this.directory = options.directory || './';
    this.stdout = options.stdout || process.stdout;
    this.renderer = renderer.create({
        directory: this.directory,
        stdout: this.stdout
    });

    this._initApp();
}

Server.prototype._initApp = function() {
    var app = express();
    var self = this;
    app.configure(function(){
        app.set('port', self.port);
        app.use(app.router);
        app.use(require('less-middleware')({ src: __dirname + '/../../public' }));
        app.use(express.static(self.directory + '/public'));
        app.use(express.static(__dirname + '/../../public'));
        app.use(express.errorHandler());
    });
    app.get('/', function(req, res) {
        self._serveIndexPage(req, res);
    });
    this.app = app;
};

Server.prototype.listen = function(callback) {
    this.server = http.createServer(this.app);
    var self = this;
    this.server.listen(
        this.app.get('port'),
        function(err){
            if (err) {
                if(err.code === 'EADDRINUSE') {
                    self.stdout.write('ERROR: Port '+self.app.get('port')+' is already in use.');
                } else {
                    throw err;
                }
            }
            self.stdout.write("==> Presentation running on http://" + os.hostname() + ':' + self.app.get('port'));
            callback && callback();
        }
    );
};

Server.prototype.stopListening = function(callback) {
    this.server.close(callback);
};

Server.prototype._serveIndexPage = function(req, res) {
    this.renderer.getIndexPage().then(function(html) {
        res.send(html);
    }).end();
};

function getServer(options) {
    return new Server(options);
}


//function listenForWebsockets(server) {
    //var io = socketio.listen(server);
    //io.set('log level', 0);
    //var clientCount = 0;
    //io.sockets.on('connection', function (socket) {
        //clientCount++;
        //stdout.write('- Client connected.');
        //socket.on('master-slide-changed', function(data) {
            //stdout.write('==> Master changed to slide ' + (data.currentSlide + 1));
            //socket.broadcast.emit('slide-change', data);
            //stdout.write('- Notified ' + (clientCount-1) + ' clients.');
        //});
        //socket.on('disconnect', function () {
            //clientCount--;
            //stdout.write('- Client disconnected.');
        //});
    //});
//}

