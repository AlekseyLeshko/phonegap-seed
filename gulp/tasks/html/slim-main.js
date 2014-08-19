var gulp = require('gulp');
var slim = require('gulp-slim');
var minifyHTML = require('gulp-minify-html');
var htmlreplace = require('gulp-html-replace');
var config = require('../../configs/gulp.json');

gulp.task('slim-main', function() {
  var slimConfig = {
    pretty: true
  };

  var url = '"http://';
  url += config.debug.ip + ':' + config.debug.port;
  url += '/target/target-script-min.js#anonymous"';
  var tpl = '<script src=%s></script>';

  var htmlreplaceConfig = {
    jsForDebug: {
      src: url,
      tpl: tpl
    }
  };

  var minifyConfig = {
    empty: true
  };

  return gulp.src('app/*.slim')
    .pipe(slim(slimConfig))
    .pipe(htmlreplace(htmlreplaceConfig))
    .pipe(minifyHTML(minifyConfig))
    .pipe(gulp.dest('www/'));
});
