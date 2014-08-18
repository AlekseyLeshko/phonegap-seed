var gulp = require('gulp');

gulp.task('reload-app', function() {
  return gulp.src('app/**/*.*')
    .pipe(connect.reload());
});
