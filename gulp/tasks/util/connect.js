var gulp = require('gulp');
var connect = require('gulp-connect');
var appConfig = require('../../../config/app.json');

gulp.task('connect', function() {
  var connectConfig = {
    root: 'www',
    port: appConfig.dev.port,
    livereload: true
  };

  return connect.server(connectConfig);
});
