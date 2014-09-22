var gulp = require('gulp');
var appConfig = require('../../../config/app.json');
var angularFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var javascriptobfuscator = require('gulp-javascriptobfuscator');

gulp.task('scripts', ['jshint'], function() {
  var config = {
    mangle: true
  };

  return gulp.src('app/**/*.js')
    .pipe(angularFilesort())
    .pipe(sourcemaps.init())
    .pipe(uglify(config))
    .pipe(concat(appConfig.appScript))
    .pipe(sourcemaps.write('maps'))
    .pipe(javascriptobfuscator())
    .pipe(gulp.dest('www/js/'));
});
