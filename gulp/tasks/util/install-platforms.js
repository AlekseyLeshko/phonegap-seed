var gulp = require('gulp');
var sh = require('shelljs');

gulp.task('install-platforms', function() {
  var platforms = cordovaConfig.platforms;
  for (var i = 0; i < platforms.length; i++) {
    var platform = platforms[i];
    var command = 'cordova platform add ' + platform;
    sh.echo('run comand: ' + command);
    sh.exec(command);
  }
});
