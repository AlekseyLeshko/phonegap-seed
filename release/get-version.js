var fs = require("fs");
var semver = require("semver");

var packageFile = fs.readFileSync('./config/app.json');
var packageJson = JSON.parse(packageFile);
var ver = semver.parse(packageJson.config.version);
console.log(ver.toString());
