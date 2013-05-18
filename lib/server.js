var http = require('http'),
    os = require('os'),
    app = require('./app');

exports.getServer = function (options) {
    return new Server(options);
};

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

Server.prototype = {
    listen: function(callback) {
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
    },

    stopListening: function(callback) {
        this.server.close(callback);
    }
};

