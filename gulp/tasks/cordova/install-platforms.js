var gulp = require('gulp');
var sh = require('shelljs');
var config = require('../../../config/cordova.json');

gulp.task('install-platforms', function() {
  var platforms = config.platforms;
  for (var i = 0; i < platforms.length; i++) {
    var platform = platforms[i];
    var command = 'cordova platform add ' + platform;
    sh.echo('run command: ' + command);
    sh.exec(command);
  }
});
