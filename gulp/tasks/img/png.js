var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var optipng = require('imagemin-optipng');

gulp.task('png', function() {
  var config = {
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [optipng()]
  };

  return gulp.src('app/assets/img/**/*.png')
    .pipe(imagemin(config))
    .pipe(gulp.dest('www/img'));
});
