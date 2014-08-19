var gulp = require('gulp');
var runSequence = require('run-sequence');
var util = require('gulp-util');

gulp.task('build', function(callback) {
  var arr = ['slim', 'scripts', 'ionic', 'img'];

  if (envIsDebug()) {
    arr.push('weinre');
  }
  console.log(arr);

  return runSequence('clean', 'bower', arr, 'scss', callback);
});

function envIsDebug() {
  var args = util.env;
  return args.env === 'debug';
}
