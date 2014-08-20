var util = require('gulp-util');
var gulpConfig = require('../../configs/gulp.json');
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
    var url = this.getIpForDebug() + ':' + gulpConfig.debug.port;
    return url;
  },

  getIpForDebug: function() {
    var localhost = 'localhost';
    var ip = gulpConfig.debug.ip;
    if (ip === localhost) {
      ip = myIP();
    }

    return ip;
  }
};
