var gulp = require('gulp');
var gopen = require('gulp-open');

gulp.task('open-index', function(){
  var options = {
    url: 'http://localhost:' + global.port,
    app: 'google-chrome'
  };

  gulp.src('www/index.html')
    .pipe(gopen('', options));
});
