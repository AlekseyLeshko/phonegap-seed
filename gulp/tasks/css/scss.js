var gulp = require('gulp');
var appConfig = require('../../../config/app.json');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

gulp.task('scss', function() {
  var config = {
    keepSpecialComments: 0
  };

  return gulp.src('app/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(minifyCSS(config))
    .pipe(concat(appConfig.appCss))
    .pipe(gulp.dest('www/css/'));
});
