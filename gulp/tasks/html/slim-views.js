var gulp = require('gulp');
var slim = require('gulp-slim');
var minifyHTML = require('gulp-minify-html');

gulp.task('slim-views', function() {
  return gulp.src('app/views/*.slim')
    .pipe(slim({ pretty: true }))
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest('www/views/'));
});
