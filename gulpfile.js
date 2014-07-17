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

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('start', function(callback) {
  return runSequence('build',
    'connect', callback);
});

gulp.task('build', function(callback) {
  return runSequence('clean', ['slim', 'js', 'sass', 'bower'],
    'bower-app',
    callback);
});
gulp.task('slim', ['slim-main', 'slim-partials']);

var srcPath = './src/';
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
var pathBaseOnApp = partialOneArg(pathBuilder, appPath);

var path = {
  src: {
    slim: {
      main: pathBaseOnSrc('slim/*.slim'),
      partials: pathBaseOnSrc('slim/partials/*.slim')
    },
    sass: pathBaseOnSrc('scss/*.scss'),
    coffee: pathBaseOnSrc('js/*.js')
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
    .pipe(gulp.dest(path.app.html.main));
});

gulp.task('slim-partials', function() {
  return gulp.src(path.src.slim.partials)
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest(path.app.html.partials));
});

gulp.task('sass', function() {
  return gulp.src(path.src.sass)
    .pipe(sass())
    .pipe(gulp.dest(path.app.css));
});

gulp.task('js', function() {
  return gulp.src(path.src.coffee)
    .pipe(gulp.dest(path.app.js));
});

gulp.task('bower', function() {
  return bower(path.bower);
});

gulp.task('bower-app', function() {
  gulp.src(path.bower + 'html5-boilerplate/css/*.css')
    .pipe(gulp.dest(path.app.css));

  gulp.src(path.bower + 'html5-boilerplate/js/vendor/modernizr-2.6.2.min.js')
    .pipe(gulp.dest(path.app.js));

  gulp.src(path.bower + 'angular/angular.js')
    .pipe(gulp.dest(path.app.js));

  gulp.src(path.bower + 'angular-route/angular-route.js')
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

gulp.task('connect', function() {
  connect.server({
    root: 'www',
    livereload: true
  });
});
