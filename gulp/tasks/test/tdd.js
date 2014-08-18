var gulp = require('gulp');
var karma = require('karma').server;
var _ = require('lodash');
var defaultConfig = require('../../configs/karma.json');

gulp.task('tdd', function (done) {
  var specificConfig = {
    browsers: ['PhantomJS']
  };

  var karmaConfig = _.assign({}, defaultConfig, specificConfig);
  return karma.start(karmaConfig, done);
});
