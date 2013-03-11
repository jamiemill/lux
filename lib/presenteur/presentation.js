var deferred = require('deferred'),
    jade = require('jade'),
    fs = require('fs'),
    path = require('path'),
    readFile = deferred.promisify(fs.readFile);

var ASSETS_TEMPLATE_FILE = __dirname + '/views/assets.jade';
var POPUP_CONTROLLER_TEMPLATE_FILE = __dirname + '/views/popup-controller.jade';
var POPUP_CONTROLLER_ASSETS_TEMPLATE = __dirname + '/views/popup-controller-assets.jade';

function Presentation(options) {
    this.directory = options.directory;
    this.templateFile = this.directory + 'index.jade';
    this.layoutFile = this.directory + 'layout.jade';
}


Presentation.prototype = {

    getIndexPage: function() {
        var def = deferred();
        var self = this;
        deferred.map([
            this.templateFile,
            ASSETS_TEMPLATE_FILE
        ], function(fileName) {
            return readFile(fileName, 'utf-8');
        })
        .then(function(files) {
            var template = jade.compile(files[0], {filename: self.templateFile});
            var assetsTemplate = jade.compile(files[1]);
            def.resolve(template({
                pres_assets: assetsTemplate()
            }));
        }).end();
        return def.promise;
    },

    getPopupControllerPage: function() {
        var def = deferred();
        deferred.map([
            POPUP_CONTROLLER_TEMPLATE_FILE,
            POPUP_CONTROLLER_ASSETS_TEMPLATE
        ], function(fileName) {
            return readFile(fileName, 'utf-8');
        })
        .then(function(files) {
            var template = jade.compile(files[0], {filename: POPUP_CONTROLLER_TEMPLATE_FILE});
            var assetsTemplate = jade.compile(files[1]);
            def.resolve(template({
                pres_assets: assetsTemplate()
            }));
        }).end();
        return def.promise;
    },

    checkAssets: function() {
        var templatesOK = true;
        [this.templateFile, this.layoutFile].forEach(function(file) {
            if(fs.existsSync(file)) {
                console.log('- Found '+file+'.');
            } else {
                templatesOK = false;
                throw new Error('No '+path.basename(file)+' file found.');
            }
        });
        if(fs.existsSync('public')) {
            console.log('- Serving extra assets from public/.');
        } else {
            console.log('- No public/ directory found for extra assets.');
        }
    }
};

var create = function(options) {
    return new Presentation(options);
};

exports.create = create;
