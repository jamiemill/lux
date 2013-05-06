var deferred = require('deferred'),
    jade = require('jade'),
    fs = require('fs'),
    path = require('path'),
    readFile = deferred.promisify(fs.readFile);

var ASSETS_TEMPLATE_FILE = __dirname + '/views/assets.jade';
var LAYOUT_FILE = __dirname + '/views/layout.jade';

function Presentation(options) {
    this.directory = options.directory;
    this.templateFile = this.directory + 'index.jade';
    this.stdout = options.stdout || process.stdout;
    this._checkAssets();
}


Presentation.prototype = {

    getIndexPage: function() {
        var def = deferred();
        deferred.map([
                this.templateFile,
                LAYOUT_FILE,
                ASSETS_TEMPLATE_FILE
            ], function(fileName) {
                return readFile(fileName, 'utf-8');
            })
            .then(function(files) {
                var compiledFiles = files.map(function(file) {
                    return jade.compile(file, {pretty: true});
                });

                var templateStr = compiledFiles[0]();
                var layoutStr = compiledFiles[1]({
                    content: templateStr,
                    pres_assets: compiledFiles[2]()
                });
                def.resolve(layoutStr);
            }, function(error) {
                if (error.code === 'ENOENT') {
                    def.resolve(new Error('File does not exist: ' + error.path));
                } else {
                    def.resolve(error);
                }
            })
        .end();
        return def.promise;
    },

    //getPopupControllerPage: function() {
        //var def = deferred();
        //deferred.map([
            //POPUP_CONTROLLER_TEMPLATE_FILE,
            //POPUP_CONTROLLER_ASSETS_TEMPLATE
        //], function(fileName) {
            //return readFile(fileName, 'utf-8');
        //})
        //.then(function(files) {
            //var template = jade.compile(files[0], {
                //filename: POPUP_CONTROLLER_TEMPLATE_FILE
            //});
            //var assetsTemplate = jade.compile(files[1]);
            //def.resolve(template({
                //pres_assets: assetsTemplate()
            //}));
        //}).end();
        //return def.promise;
    //},

    _checkAssets: function() {
        var templatesOK = true,
            self = this;
        [this.templateFile].forEach(function(file) {
            if (fs.existsSync(file)) {
                self.stdout.write('- Found ' + file + '.\n');
            } else {
                templatesOK = false;
                throw new Error('No ' + path.basename(file) + ' file found.');
            }
        });
        if (fs.existsSync('public')) {
            this.stdout.write('- Serving extra assets from public/.\n');
        } else {
            this.stdout.write('- No public/ directory found for extra assets.\n');
        }
    }
};

var create = function(options) {
    return new Presentation(options);
};

exports.create = create;
