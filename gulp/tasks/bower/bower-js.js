var gulp = require('gulp');
var appConfig = require('../../../config/app.json');

gulp.task('bower-js', function(cb) {
  return gulp.src(appConfig.scripts)
    .pipe(gulp.dest('www/js/lib'));
});
