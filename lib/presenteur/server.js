var express = require('express'),
    http = require('http'),
    path = require('path'),
    os = require('os'),
    socketio = require('socket.io'),
    presentation = require('./presentation');

exports.start = start;

var pres;

function start() {
    pres = presentation.create({
        directory: './'
    });
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
        app.use(require('less-middleware')({ src: __dirname + '/public' }));
        app.use(express.static('./public'));
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(express.errorHandler());
    });

    app.get('/', serveIndexPage);
    app.get('/master', serveIndexPage);
    app.get('/popup-controller', servePopupControllerPage);

    var server = http.createServer(app).listen(app.get('port'), function(err){
        console.log("==> Presentation running on http://" + os.hostname() + ':' + app.get('port'));
    }).on('error', function(error) {
        if(error.code === 'EADDRINUSE') {
            console.log('ERROR: Port '+app.get('port')+' is already in use.');
        } else {
            console.log('ERROR: ');
            console.log(error);
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
        console.log('- Client connected.');
        socket.on('master-slide-changed', function(data) {
            console.log('==> Master changed to slide ' + (data.currentSlide + 1));
            socket.broadcast.emit('slide-change', data);
            console.log('- Notified ' + (clientCount-1) + ' clients.');
        });
        socket.on('disconnect', function () {
            clientCount--;
            console.log('- Client disconnected.');
        });
    });
}

