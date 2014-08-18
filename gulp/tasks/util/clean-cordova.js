var gulp = require('gulp');
var sh = require('shelljs');

gulp.task('clean-cordova', function() {
  var paths = [
    'platforms/',
    'plugins/'
  ];
  sh.rm('-rf', paths);
});
