var gulp = require('gulp');
var sh = require('shelljs');
var appConfig = require('../../../config/app.json');

gulp.task('weinre', function() {
  var command = 'weinre --boundHost -all- --httpPort ';
  command += appConfig.debug.port;

  sh.echo('run command: ' + command);
  sh.exec(command);
});
