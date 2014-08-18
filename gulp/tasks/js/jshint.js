var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('jshint', function() {
  var paths = [
    'app/**/*.js',
    'gulpfile.js',
    'gulp/**/*.js'
  ];

  return gulp.src(paths)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
