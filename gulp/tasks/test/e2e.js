var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;
var appConfig = require('../../configs/app.json');

gulp.task('e2e', ['webdriver-update'], function(callback) {
  var url = 'http://';
  url += appConfig.dev.ip + ':' + appConfig.dev.port;

  var protractorConfig = {
    configFile: 'test/protractor-conf.js',
    args: ['--baseUrl', url]
  };

  return gulp.src('e2e/*.js')
    .pipe(protractor(protractorConfig))
    .on('error', function(e) { throw e; });
});
