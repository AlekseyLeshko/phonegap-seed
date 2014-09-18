var gulp = require('gulp');
var runSequence = require('run-sequence');
var bundleGulp = require('../util/bundleGulp');

gulp.task('build', function(callback) {
  var taskList = ['slim', 'scripts', 'img', 'scss', 'bower-copy'];
  return runSequence('clean', 'bower', taskList, callback);
});
