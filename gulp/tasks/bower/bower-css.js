var gulp = require('gulp');
var appConfig = require('../../../config/app.json');

gulp.task('bower-css', function(cb) {
  return gulp.src(appConfig.css)
    .pipe(gulp.dest('www/css'));
});
