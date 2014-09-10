var gulp = require('gulp');
var slim = require('gulp-slim');
var minifyHTML = require('gulp-minify-html');

gulp.task('slim-views', function() {
  var slimConfig = {
    pretty: true
  };

  var minifyConfig = {
    empty: true,
    spare: true
  };

  return gulp.src('app/views/*.slim')
    .pipe(slim(slimConfig))
    .pipe(minifyHTML(minifyConfig))
    .pipe(gulp.dest('www/views/'));
});
