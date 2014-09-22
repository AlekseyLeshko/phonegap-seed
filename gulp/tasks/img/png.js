var gulp = require('gulp');
var optipng = require('imagemin-optipng');

gulp.task('png', function() {
  return gulp.src('app/assets/img/**/*.png')
    .pipe(optipng({ optimizationLevel: 3 }))
    .pipe(gulp.dest('www/img'));
});
