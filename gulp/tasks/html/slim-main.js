var gulp = require('gulp');
var slim = require('gulp-slim');
var minifyHTML = require('gulp-minify-html');
var htmlreplace = require('gulp-html-replace');
var gulpConfig = require('../../configs/gulp.json');
var util = require('gulp-util');

gulp.task('slim-main', function() {
  var slimConfig = {
    pretty: true
  };

  var url = '"http://';
  url += gulpConfig.debug.ip + ':' + gulpConfig.debug.port;
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

  var task = gulp.src('app/*.slim')
    .pipe(slim(slimConfig));

  if (envIsDebug()) {
    task = task.pipe(htmlreplace(htmlreplaceConfig));
  }

  return task
    .pipe(minifyHTML(minifyConfig))
    .pipe(gulp.dest('www/'));
});

function envIsDebug() {
  var args = util.env;
  return args.env === 'debug';
}
