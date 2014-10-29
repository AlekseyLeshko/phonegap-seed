var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build-and-reload', function(callback) {
  return runSequence('build', 'create-html-fixtures', 'reload-app', callback);
});
