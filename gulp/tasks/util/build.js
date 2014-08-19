var gulp = require('gulp');
var runSequence = require('run-sequence');
var bundleGulp = require('../util/bundleGulp');

gulp.task('build', function(callback) {
  var arr = ['slim', 'scripts', 'ionic', 'img'];

  if (bundleGulp.envIsDebug()) {
    arr.push('weinre');
  }

  return runSequence('clean', 'bower', arr, 'scss', callback);
});
