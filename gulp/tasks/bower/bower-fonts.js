var gulp = require('gulp');
var appConfig = require('../../../config/app.json');

gulp.task('bower-fonts', function(cb) {
  return gulp.src(appConfig.fonts)
    .pipe(gulp.dest('www/fonts'));
});
