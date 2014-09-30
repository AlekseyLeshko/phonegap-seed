var pjv = require('package-json-validator').PJV;
var fs = require("fs");

var configFiles = [
  'package.json',
  'bower.json'
];
var spec = 'npm';
var options = {
  warnings: true,
  recommendations: true
};

var valid = true;
for (var i = 0; i < configFiles.length; i++) {
  var fileName = configFiles[i];
  var data = fs.readFileSync(fileName).toString();
  var res = pjv.validate(data, spec, options);
  if (!res.valid) {
    valid = res.valid;
  }
}
console.log(valid);
