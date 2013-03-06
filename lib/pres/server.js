var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , jade = require('jade')
  , os = require('os')
  , deferred = require('deferred')
;

var readFile = deferred.promisify(fs.readFile);

exports.start = start;

var TEMPLATE_FILE = './index.jade';
var LAYOUT_FILE = './layout.jade';
var ASSETS_TEMPLATE_FILE = __dirname + '/views/assets.jade';

function start() {
    checkAssets();
    startServer();
}

function serveIndexPage(req, res) {
    deferred.map([TEMPLATE_FILE, ASSETS_TEMPLATE_FILE], function(fileName) {
        return readFile(fileName, 'utf-8');
    })
    .then(function(files) {
        var template = jade.compile(files[0], {filename: TEMPLATE_FILE});
        var assetsTemplate = jade.compile(files[1]);
        res.send(template({
            pres_assets: assetsTemplate()
        }));
    }).end();
}

function startServer() {
    var app = express();
    app.configure(function(){
      app.set('port', process.env.PORT || 3000);
      app.set('views', __dirname + '/views');
      app.set('view engine', 'jade');
      app.use(express.favicon());
      app.use(express.logger('dev'));
      app.use(app.router);
      app.use(require('less-middleware')({ src: __dirname + '/public' }));
      app.use(express.static('./public'));
      app.use(express.static(path.join(__dirname, 'public')));
      app.use(express.errorHandler());
    });

    app.get('/', serveIndexPage);

    http.createServer(app).listen(app.get('port'), function(err){
      console.log("==> Presentation running on http://" + os.hostname() + ':' + app.get('port'));
    }).on('error', function(error) {
        if(error.code === 'EADDRINUSE') {
            console.log('ERROR: Port '+app.get('port')+' is already in use.');
        } else {
            console.log('ERROR: ');
            console.log(error);
        }
    });
}

function checkAssets() {
    var templatesOK = true;
    [TEMPLATE_FILE, LAYOUT_FILE].forEach(function(file) {
        if(fs.existsSync(file)) {
            console.log('- Found '+file+'.');
        } else {
            templatesOK = false;
            console.log('- No '+file+' found in current directory.');
        }
    });
    if (!templatesOK) {
        process.exit(127);
    }
    if(fs.existsSync('public')) {
        console.log('- Serving extra assets from public/.');
    } else {
        console.log('- No public/ directory found for extra assets.');
    }
}
