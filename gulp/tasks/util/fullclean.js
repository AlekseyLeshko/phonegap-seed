var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('fullclean', function(callback) {
  return runSequence('clean', 'clean-cordova', callback);
});
