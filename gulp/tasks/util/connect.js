var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  return connect.server({
    root: 'www',
    port: global.port,
    livereload: true
  });
});
