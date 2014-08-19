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
    url += gulpConfig.debug.ip + ':' + gulpConfig.debug.port;
    url += '/target/target-script-min.js#anonymous"';
    var tpl = '<script src=%s></script>';

    var config = {
      jsForDebug: {
        src: url,
        tpl: tpl
      }
    };

    return config;
  }
};
