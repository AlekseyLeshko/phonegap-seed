var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

gulp.task('scss', function() {
  return gulp.src('app/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(minifyCSS({
      keepSpecialComments: 0
    }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('www/css/'));
});
