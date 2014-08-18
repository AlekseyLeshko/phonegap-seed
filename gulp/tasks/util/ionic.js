var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('ionic', function(callback) {
  return runSequence(['ionic-fonts', 'ionic-js'], callback);
});
