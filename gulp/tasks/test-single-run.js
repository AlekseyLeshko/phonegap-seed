var gulp = require('gulp');
var karma = require('karma').server;
var _ = require('lodash');
var defaultConfig = require('../configs/karma.json');

gulp.task('test-single-run', function (done) {
  var karmaConfig = _.assign({}, defaultConfig, { singleRun: true });

  return karma.start(karmaConfig, done);
});
