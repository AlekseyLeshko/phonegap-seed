var gulp = require('gulp');
var sh = require('shelljs');
var gulpConfig = require('../../configs/gulp.json');

gulp.task('weinre', function() {
  var command = 'weinre --boundHost -all- --httpPort ';
  command += gulpConfig.debug.port;

  sh.echo('run command: ' + command);
  sh.exec(command);
});
