/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , jade = require('jade');

exports.start = start;

function start() {
    var app = express();

    app.configure(function(){
      app.set('port', process.env.PORT || 3000);
      app.set('views', __dirname + '/views');
      app.set('view engine', 'jade');
      app.use(express.favicon());
      app.use(express.logger('dev'));
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(app.router);
      app.use(require('less-middleware')({ src: __dirname + '/public' }));

      // Serve assets first from the presentation's local public directory,
      // then fall back to this module's public directory.
      app.use(express.static('./public'));
      app.use(express.static(path.join(__dirname, 'public')));
    });

    app.configure('development', function(){
      app.use(express.errorHandler());
    });

    var templateFile = './index.jade';
    var layoutFile = './layout.jade';
    [templateFile, layoutFile].forEach(function(file) {
        if(!fs.existsSync(file)) {
            console.log('No '+file+' found in current directory.');
            process.exit(127);
        }
    });

    app.get('/', function(req, res) {
        var template = jade.compile(fs.readFileSync(templateFile, 'utf8'), {
            filename: templateFile
        });
        res.send(template());
    });

    http.createServer(app).listen(app.get('port'), function(){
      console.log("Presentation running on port " + app.get('port'));
    });
}
