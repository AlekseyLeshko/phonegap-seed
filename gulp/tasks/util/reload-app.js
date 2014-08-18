var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('reload-app', function() {
  return gulp.src('app/**/*.*')
    .pipe(connect.reload());
});
