var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  var config = {
    root: 'www',
    port: global.port,
    livereload: true
  };

  return connect.server(config);
});
