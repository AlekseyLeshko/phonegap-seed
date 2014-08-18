var gulp = require('gulp');

gulp.task('ionic-js', function(cb) {
  return gulp.src('bower_components/ionic/js/ionic.bundle.js')
    .pipe(gulp.dest('www/js/lib'));
});
