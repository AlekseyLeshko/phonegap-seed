var gulp = require('gulp');
var slim = require('gulp-slim');
var minifyHTML = require('gulp-minify-html');
var htmlreplace = require('gulp-html-replace');
var bundleGulp = require('../util/bundleGulp');

gulp.task('slim-main', function() {
  var slimConfig = {
    pretty: true
  };

  var htmlreplaceConfig = bundleGulp.getHtmlreplaceConfig();

  var minifyConfig = {
    empty: true
  };

  var task = gulp.src('app/*.slim')
    .pipe(slim(slimConfig));

  if (bundleGulp.envIsDebug()) {
    task = task.pipe(htmlreplace(htmlreplaceConfig));
  }

  return task
    .pipe(minifyHTML(minifyConfig))
    .pipe(gulp.dest('www/'));
});
