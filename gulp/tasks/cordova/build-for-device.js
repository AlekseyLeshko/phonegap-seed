var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build-for-device', function(callback) {
  return runSequence('build', 'build-cordova', callback);
});
