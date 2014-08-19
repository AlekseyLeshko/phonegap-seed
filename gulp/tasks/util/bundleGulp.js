var util = require('gulp-util');

module.exports = {
  envIsDebug: function() {
    var debug = 'debug';
    var args = util.env;
    var answer = args.env === debug;
    return answer;
  }
};
