var path = require('path');
var jade = require('jade');
var fs = require('fs');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout); }

// Create index.html from layout and presentation content
var contentFile = 'views/index.jade';
var content = jade.compile(fs.readFileSync(contentFile, 'utf-8'), {filename: contentFile})();
fs.writeFileSync('export/index.html', content);

// Copy stylesheet and JS files
exec("cp -R public/* export/", puts);
