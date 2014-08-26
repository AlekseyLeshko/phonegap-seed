var gulp = require('gulp');
var gopen = require('gulp-open');
var appConfig = require('../../configs/app.json');

gulp.task('open-index', function(){
  var gopenConfig = {
    url: 'http://' + appConfig.dev.ip + ':' + appConfig.dev.port,
    app: appConfig.dev.browser
  };

  return gulp.src('www/index.html')
    .pipe(gopen('', gopenConfig));
});
