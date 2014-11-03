var gulp = require('gulp');
var sh = require('shelljs');

gulp.task('clean', function() {
  var paths = [
    'www',
    'test/fixtures/views/',
    'coverage/'
  ];

  sh.rm('-rf', paths);
});
