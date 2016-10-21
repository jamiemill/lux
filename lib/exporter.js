var path = require('path'),
    fs = require('fs'),
    deferred = require('deferred'),
    exec = deferred.promisify(require('child_process').exec),
    writeFile = deferred.promisify(fs.writeFile),
    presentation = require('./renderer');

exports.exportPresentation = exportPresentation;

function exportPresentation() {
    var pres = presentation.create({
        directory: './'
    });
    console.log('Creating "export" directory.');
    exec('mkdir -p export')
    .then(function() {
        console.log('Generating index page.');
        return pres.getIndexPage();
    })
    .then(function(html) {
        console.log('Writing index page.');
        return writeFile('export/index.html', html);
    })
    .then(function() {
        var publicSrc = path.join(escapeshell(__dirname), '../', 'public/*');
        console.log('Copying core public assets.');
        return exec('cp -R ' + publicSrc + ' export/');
    })
    .then(function() {
        console.log('Copying custom public assets.');
        return exec('if test -d public; then cp -R public/* export/; fi');
    })
    .then(function() {
        console.log('Done.');
    })
    .end();
}

var escapeshell = function(cmd) {
    return cmd.replace(/(["\s'$`\\])/g,'\\$1');
};
