var gulp = require('gulp');
var sh = require('shelljs');
var config = require('../../configs/cordova.json');

gulp.task('install-plugins', function() {
  var plugins = config.plugins;
  for (var i = 0; i < plugins.length; i++) {
    var plugin = plugins[i];
    var command = 'cordova plugin add ' + plugin;
    sh.echo('run command: ' + command);
    sh.exec(command);
  }
});
