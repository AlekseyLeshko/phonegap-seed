var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var optipng = require('imagemin-optipng');

gulp.task('png', function() {
  return gulp.src('app/assets/img/**/*.png')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [optipng()]
    }))
    .pipe(gulp.dest('www/img'));
});
