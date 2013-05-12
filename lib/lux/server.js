var http = require('http'),
    os = require('os'),
    //socketio = require('socket.io'),
    app = require('./app');

exports.getServer = getServer;

function Server(options) {
    options = options || {};
    this.port = options.port || 3000;
    this.directory = options.directory || './';
    this.stdout = options.stdout || process.stdout;
    this.app = app.createApp({
        directory: this.directory,
        stdout: this.stdout,
        port: this.port
    });
}

Server.prototype.listen = function(callback) {
    this.server = http.createServer(this.app.app);
    var self = this;
    this.server.listen(
        this.app.app.get('port'),
        function(err){
            if (err) {
                if(err.code === 'EADDRINUSE') {
                    self.stdout.write('ERROR: Port '+self.app.app.get('port')+' is already in use.');
                } else {
                    throw err;
                }
            }
            self.stdout.write("==> Presentation running on http://" + os.hostname() + ':' + self.app.app.get('port'));
            if (callback) callback();
        }
    );
};

Server.prototype.stopListening = function(callback) {
    this.server.close(callback);
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

