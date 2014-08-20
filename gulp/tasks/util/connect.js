var gulp = require('gulp');
var connect = require('gulp-connect');
var gulpConfig = require('../../configs/gulp.json');

gulp.task('connect', function() {
  var connectConfig = {
    root: 'www',
    port: gulpConfig.dev.port,
    livereload: true
  };

  return connect.server(connectConfig);
});
