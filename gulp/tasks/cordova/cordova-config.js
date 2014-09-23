var gulp = require('gulp');

gulp.task('cordova-config', function(callback) {
  return gulp.src('config.xml')
    .pipe(gulp.dest('www/'));
});
