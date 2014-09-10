var gulp = require('gulp');

gulp.task('ionic-fonts', function(cb) {
  return gulp.src('bower_components/ionic/fonts/**/*.*')
    .pipe(gulp.dest('www/fonts'));
});
