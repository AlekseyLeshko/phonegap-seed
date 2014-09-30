var fs = require('fs');
var semver = require('semver');
var bail = require('./bail');
var extend = require('./extend');

Config = function(fileName) {
  this.fileName = fileName;
  this.readFile();
}

Config.prototype = {
  readFile: function() {
    this.file = fs.readFileSync(this.fileName);
    this.json = JSON.parse(this.file);
  },

  check: function () {
    if (!('version' in this.json.config)) {
      bail('ERROR: Could not find version in ' + this.fileName);
    }

    this.ver = semver.parse(this.json.config.version);
    if (this.ver === null) {
      bail('ERROR: Incorrect version in ' + this.fileName);
    }
  },

  incVer: function(type) {
    var defaultType = "patch";
    var newVer = this.ver.inc(defaultType);
    this.json.config.version = newVer.toString();
  },

  updateJson: function(mainConfig) {
    this.json = extend({},  this.json, mainConfig.json.config);
  },

  save: function() {
    var replacer = undefined;
    var space = 2;
    var jsonData = JSON.stringify(this.json, replacer, space) + "\n";
    fs.writeFileSync(this.fileName, jsonData);
    this.readFile();
  }
};

module.exports = Config
