var path = require('path');
var jade = require('jade');
var fs = require('fs');

var publicDir = path.join(__dirname, 'public');
var contentFile = 'views/index.jade';
var content = jade.compile(fs.readFileSync(contentFile, 'utf-8'), {filename: contentFile})();

fs.writeFileSync('export/index.html', content);

