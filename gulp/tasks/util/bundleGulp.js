var util = require('gulp-util');
var appConfig = require('../../../config/app.json');
var myIP = require('my-ip');

module.exports = {
  envIsDebug: function() {
    var debug = 'debug';
    var args = util.env;
    var answer = args.env === debug;
    return answer;
  },

  getHtmlreplaceConfig: function () {
    var url = '"http://';
    url += this.getUrlForDebug();
    url += '/target/target-script-min.js#anonymous"';
    var tpl = '<script src=%s></script>';

    var config = {
      jsForDebug: {
        src: url,
        tpl: tpl
      }
    };

    return config;
  },

  getUrlForDebug: function() {
    var url = this.getIpForDebug() + ':' + appConfig.debug.port;
    return url;
  },

  getIpForDebug: function() {
    var localhost = 'localhost';
    var ip = appConfig.debug.ip;
    if (ip === localhost) {
      ip = myIP();
    }

    return ip;
  },

  getJSLibList: function() {
    var arr = [];
    for (var i = 0; i < appConfig.scripts.length; i++) {
      var path = this.createPath(appConfig.scripts[i], 'js/lib/');
      arr.push(path);
    }
    return arr;
  },

  createPath: function(path, prefix) {
    var splitArr = path.split('/');
    var name = splitArr[splitArr.length - 1];
    var newPath = prefix + name;
    return newPath;
  }
};
