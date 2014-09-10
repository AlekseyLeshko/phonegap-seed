var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build-cordova', function(callback) {
  return runSequence('clean-cordova', 'install-platforms', 'install-plugins', callback);
});
