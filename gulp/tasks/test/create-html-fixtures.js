var gulp = require('gulp');
var slim = require('gulp-slim');
var minifyHTML = require('gulp-minify-html');

gulp.task('create-html-fixtures', function() {
  var slimConfig = {
    pretty: true
  };

  var minifyConfig = {
    empty: true,
    spare: true
  };

  var viewArr = [
    'app/index.slim',
    'app/views/**/*.slim'
  ];

  return gulp.src(viewArr)
    .pipe(slim(slimConfig))
    .pipe(minifyHTML(minifyConfig))
    .pipe(gulp.dest('test/fixtures/views/'));
});
