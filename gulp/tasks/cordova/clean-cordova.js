var gulp = require('gulp');
var sh = require('shelljs');

gulp.task('clean-cordova', function() {
  var paths = [
    'platforms/',
    'plugins/',
    'merges/'
  ];
  sh.rm('-rf', paths);
});
