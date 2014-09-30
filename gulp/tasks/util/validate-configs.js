var gulp = require('gulp');
var validate = require('gulp-nice-package');
var mapstream = require('map-stream');

process.on('exit', function () {
  process.nextTick(function () {
    process.exit(1);
  });
});

gulp.task('validate-configs', function () {
  var isValid = true;
  return gulp.src(['package.json', 'bower.json'])
    .pipe(validate())
    .pipe(mapstream(function (file, cb) {
      isValid = file.nicePackage.valid;
      cb(null, file);
    }))
    .on('end', function() {
      if (!isValid) {
        process.emit('exit');
      }
    });
});
