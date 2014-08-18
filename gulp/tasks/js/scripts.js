var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', ['jshint'], function() {
  var paths = [
    'app.module.js',
    'app/**/*.js'
  ];
  var config = {
    mangle: true
  };

  return gulp.src(paths)
    .pipe(sourcemaps.init())
    .pipe(uglify(config))
    .pipe(concat('app-script.min.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('www/js/'));
});
