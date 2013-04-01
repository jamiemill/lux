var express = require('express'),
    http = require('http'),
    path = require('path'),
    os = require('os'),
    socketio = require('socket.io'),
    presentation = require('./presentation');

exports.start = start;

var pres,
    stdout;

function start(options) {
    stdout = options.stdout || process.stdout;
    pres = presentation.create({
        directory: './',
        stdout: stdout
    });
    pres.checkAssets();
    var server = startServer();
    listenForWebsockets(server);
}

function serveIndexPage(req, res) {
    pres.getIndexPage().then(function(html) {
        res.send(html);
    }).end();
}

function servePopupControllerPage(req, res) {
    pres.getPopupControllerPage().then(function(html) {
        res.send(html);
    }).end();
}

function startServer() {
    var app = express();
    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        app.use(app.router);
        app.use(require('less-middleware')({ src: __dirname + '/../../public' }));
        app.use(express.static('./public'));
        app.use(express.static(__dirname + '/../../public'));
        app.use(express.errorHandler());
    });

    app.get('/', serveIndexPage);
    app.get('/master', serveIndexPage);
    app.get('/popup-controller.html', servePopupControllerPage);

    var server = http.createServer(app).listen(app.get('port'), function(err){
        stdout.write("==> Presentation running on http://" + os.hostname() + ':' + app.get('port'));
    }).on('error', function(error) {
        if(error.code === 'EADDRINUSE') {
            stdout.write('ERROR: Port '+app.get('port')+' is already in use.');
        } else {
            stdout.write('ERROR: ');
            stdout.write(error);
        }
    });

    return server;
}

function listenForWebsockets(server) {
    var io = socketio.listen(server);
    io.set('log level', 0);
    var clientCount = 0;
    io.sockets.on('connection', function (socket) {
        clientCount++;
        stdout.write('- Client connected.');
        socket.on('master-slide-changed', function(data) {
            stdout.write('==> Master changed to slide ' + (data.currentSlide + 1));
            socket.broadcast.emit('slide-change', data);
            stdout.write('- Notified ' + (clientCount-1) + ' clients.');
        });
        socket.on('disconnect', function () {
            clientCount--;
            stdout.write('- Client disconnected.');
        });
    });
}

