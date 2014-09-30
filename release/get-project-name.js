var fs = require("fs");
var packageFile = fs.readFileSync('./config/app.json');
var packageJson = JSON.parse(packageFile);
console.log(packageJson.config.name);
