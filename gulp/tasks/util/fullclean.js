var gulp = require('gulp');
var sh = require('shelljs');

gulp.task('fullclean', ['clean', 'clean-cordova'], function() {
  var paths = [
    'test/fixtures/views/'
  ];

  sh.rm('-rf', paths);
});
