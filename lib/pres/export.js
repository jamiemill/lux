var path = require('path');
var jade = require('jade');
var fs = require('fs');
var exec = require('child_process').exec;

exports.exportPresentation = exportPresentation;

function exportPresentation() {
    console.log("Export not implemented yet :(");

    // Create index.html from layout and presentation content
    //var contentFile = 'views/index.jade';
    //var content = jade.compile(fs.readFileSync(contentFile, 'utf-8'), {filename: contentFile, pretty: true})();
    //fs.writeFileSync('export/index.html', content);

    // Copy stylesheet and JS files
    //exec("cp -R public/* export/", puts);

    //console.log("Exported to export/index.html");
}

function puts(error, stdout, stderr) {
    if (error) {
        console.log(error);
    }
}
