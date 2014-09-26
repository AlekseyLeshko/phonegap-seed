var fs = require('fs');
var semver = require('semver');
var bail = require('./bail');

Config = function(fileName) {
  this.fileName = fileName;
  this.file = fs.readFileSync(fileName);
  this.json = JSON.parse(this.file);
}

Config.prototype = {
  check: function () {
    if (!('version' in this.json)) {
      bail('ERROR: Could not find version in ' + this.fileName);
    }

    this.ver = semver.valid(this.json.version);
    if (this.ver === null) {
      bail('ERROR: Incorrect version in ' + this.fileName);
    }
  }
};

module.exports = Config
