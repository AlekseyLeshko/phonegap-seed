'use strict';

var gulp = require('gulp');
var slim = require('gulp-slim');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass')
var gutil = require('gulp-util');
var bower = require('gulp-bower');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var shell = require('gulp-shell');

gulp.task('default', ['run']);

gulp.task('run', function(callback) {
  return runSequence('build',
    'connect', callback);
});

gulp.task('build', function(callback) {
  return runSequence('clean', 'pre-build', 'concat', 'minify', callback);
});

gulp.task('pre-build', function(callback) {
  return runSequence(['slim', 'js', 'sass', 'bower'], 'bower-app', callback);
});

gulp.task('minify', function(callback) {
  return runSequence(['minify-html', 'minify-css', 'minify-js'], callback);
});

gulp.task('concat', function(callback) {
  return runSequence(['concat-css', 'concat-js'],
    callback);
});

gulp.task('run-android', ['build'], shell.task([
  'phonegap local run android'
]));

gulp.task('slim', ['slim-main', 'slim-partials']);
gulp.task('minify-html', ['minify-html-main', 'minify-html-partials']);

var srcPath = './src/';
var buildPath = './build/';
var appPath = './www/';

var pathBuilder = function(base, path) {
  return base + path;
};

function partialOneArg(f, a) {
  return function(b) {
    return f(a, b);
  }
};

var pathBaseOnSrc = partialOneArg(pathBuilder, srcPath);
var pathBaseOnBuild = partialOneArg(pathBuilder, buildPath);
var pathBaseOnApp = partialOneArg(pathBuilder, appPath);

var path = {
  src: {
    slim: {
      main: pathBaseOnSrc('slim/*.slim'),
      partials: pathBaseOnSrc('slim/partials/*.slim')
    },
    sass: pathBaseOnSrc('scss/*.scss'),
    js: pathBaseOnSrc('js/*.js')
  },
  build: {
    html: {
      main: pathBaseOnBuild(''),
      partials: pathBaseOnBuild('partials/')
    },
    css: {
      main: pathBaseOnBuild('css/main/'),
      concat: pathBaseOnBuild('css/concat/'),
    },
    js: {
      main: pathBaseOnBuild('js/main/'),
      concat: pathBaseOnBuild('js/concat/')
    },
  },
  app: {
    html: {
      main: pathBaseOnApp(''),
      partials: pathBaseOnApp('partials/')
    },
    css: pathBaseOnApp('css/'),
    js: pathBaseOnApp('js/')
  },
  bower: pathBaseOnSrc('bower_components/')
};

var cleanArr = [
  buildPath,
  path.app.html.partials,
  path.app.css,
  path.app.js,
  path.app.html.main + '*.html',
  path.bower,
];

gulp.task('slim-main', function() {
  return gulp.src(path.src.slim.main)
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest(path.build.html.main));
});

gulp.task('slim-partials', function() {
  return gulp.src(path.src.slim.partials)
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest(path.build.html.partials));
});

gulp.task('minify-html-main', function() {
  var opts = {
    empty: true
  };

  gulp.src(path.build.html.main + '*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(path.app.html.main))
});

gulp.task('minify-html-partials', function() {
  gulp.src(path.build.html.partials + '*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest(path.app.html.partials))
});

gulp.task('sass', function() {
  return gulp.src(path.src.sass)
    .pipe(sass())
    .pipe(gulp.dest(path.build.css.concat));
});

gulp.task('concat-css', function() {
  return gulp.src(path.build.css.concat + '*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest(path.build.css.main));
});

gulp.task('minify-css', function() {
  return gulp.src(path.build.css.main + '*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.app.css));
});

gulp.task('js', function() {
  return gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js.concat));
});

gulp.task('concat-js', function() {
  return gulp.src(path.build.js.concat + '*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest(path.build.js.main))
});

gulp.task('minify-js', function() {
  return gulp.src(path.build.js.main + '*.js')
    .pipe(uglify())
    .pipe(gulp.dest(path.app.js))
});

gulp.task('bower', function() {
  return bower(path.bower);
});

gulp.task('bower-app', function() {
  gulp.src(path.bower + 'html5-boilerplate/css/*.css')
    .pipe(gulp.dest(path.build.css.main));

  gulp.src(path.bower + 'html5-boilerplate/js/vendor/modernizr-2.6.2.min.js')
    .pipe(gulp.dest(path.app.js));

  gulp.src(path.bower + 'angular/angular.min.js')
    .pipe(gulp.dest(path.app.js));

  gulp.src(path.bower + 'angular-route/angular-route.min.js')
    .pipe(gulp.dest(path.app.js));
});

gulp.task('clean', function(cb) {
  return gulp.src(cleanArr, {
      read: false
    })
    .pipe(rimraf({
      force: true
    }));
});

gulp.task('clean-build', function(cb) {
  return gulp.src(buildPath, {
      read: false
    })
    .pipe(rimraf({
      force: true
    }));
});

gulp.task('connect', function() {
  connect.server({
    root: 'www',
    livereload: true
  });
});
