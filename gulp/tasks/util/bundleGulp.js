var util = require('gulp-util');
var gulpConfig = require('../../configs/gulp.json');

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
    // TODO
    var ip = '192.168.4.17';
    return ip;
  }
};
