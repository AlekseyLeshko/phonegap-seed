var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(callback) {
  return runSequence('clean', 'bower', ['test-single-run', 'slim', 'scripts', 'ionic', 'img'], 'scss', callback);
});
