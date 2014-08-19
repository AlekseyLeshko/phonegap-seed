var gulp = require('gulp');
var gopen = require('gulp-open');
var gulpConfig = require('../../configs/gulp.json');

gulp.task('open-index', function(){
  var gopenConfig = {
    url: 'http://' + gulpConfig.dev.ip + ':' + gulpConfig.dev.port,
    app: gulpConfig.dev.browser
  };

  return gulp.src('www/index.html')
    .pipe(gopen('', gopenConfig));
});
