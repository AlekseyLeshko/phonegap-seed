var gulp = require('gulp');
var sh = require('shelljs');

gulp.task('emulate-to-android', ['build-for-device'], function() {
  sh.exec('cordova emulate android');
});
