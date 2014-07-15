'use strict';

var gulp = require('gulp');
var slim = require('gulp-slim');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass')
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var bower = require('gulp-bower');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('slim', ['slim-main', 'slim-partials']);
gulp.task('build', ['slim', 'coffee', 'sass']);

var path = {
  src: {
    slim: {
      main: './src/slim/*.slim',
      partials: './src/slim/partials/*.slim'
    },
    sass: './src/scss/*.scss',
    coffee: './src/coffee/*.coffee'
  },
  app: {
    html: {
      main: './www/',
      partials: './www/partials/'
    },
    css: './www/css/',
    js: './www/js/'
  },
  bower: './src/bower_components'
};

var cleanArr = [
  path.app.html.partials,
  path.app.css,
  path.app.js,
  path.app.html.main + '*.html'
];

gulp.task('slim-main', function() {
  gulp.src(path.src.slim.main)
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest(path.app.html.main));
});

gulp.task('slim-partials', function() {
  gulp.src(path.src.slim.partials)
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest(path.app.html.partials));
});

gulp.task('sass', function() {
  gulp.src(path.src.sass)
    .pipe(sass())
    .pipe(gulp.dest(path.app.css));
});

gulp.task('coffee', function() {
  gulp.src(path.src.coffee)
    .pipe(coffee({
      bare: true
    }).on('error', gutil.log))
    .pipe(gulp.dest(path.app.js))
});

gulp.task('bower', function() {
  return bower(path.bower);
});

gulp.task('clean', function(cb) {
  return gulp.src(cleanArr, {
      read: false
    })
    .pipe(rimraf({
      force: true
    }));
});
