var gulp = require('gulp');
var slim = require("gulp-slim");

gulp.task('slim', ['slim-main', 'slim-partials']);

gulp.task('slim-main', function() {
  gulp.src("./src/slim/*.slim")
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("./www/"));
});

gulp.task('slim-partials', function() {
  gulp.src("./src/slim/partials/*.slim")
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("./www/partials/"));
});

gulp.task('default', function() {
  // place code for your default task here
});
