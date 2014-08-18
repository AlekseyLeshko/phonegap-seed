var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;

gulp.task('e2e', ['webdriver-update'], function(callback) {
  var protractorConfig = {
    configFile: 'test/protractor-conf.js',
    args: ['--baseUrl', 'http://127.0.0.1:' + global.port]
  };

  return gulp.src('e2e/*.js')
    .pipe(protractor(protractorConfig))
    .on('error', function(e) { throw e; });
});
