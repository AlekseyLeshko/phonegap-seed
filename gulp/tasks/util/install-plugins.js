var gulp = require('gulp');
var sh = require('shelljs');

gulp.task('install-plugins', function() {
  var plugins = cordovaConfig.plugins;
  for (var i = 0; i < plugins.length; i++) {
    var plugin = plugins[i];
    var command = 'cordova plugin add ' + plugin;
    sh.echo('run comand: ' + command);
    sh.exec(command);
  }
});
