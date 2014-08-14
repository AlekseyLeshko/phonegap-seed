'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var slim = require('gulp-slim');
var minifyHTML = require('gulp-minify-html');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var gshell = require('gulp-shell');
var bower = require('gulp-bower');
var karma = require('karma').server;
var _ = require('lodash');
var protractor = require("gulp-protractor").protractor;
var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
var webdriver_update = require("gulp-protractor").webdriver_update;

var port = 9001;

var karmaCommonConf = {
  basepaths : '',
  browsers: ['Chrome'],
  frameworks: ['jasmine'],
  files : [
    'src/bower_components/angular/angular.js',
    'src/bower_components/angular-route/angular-route.js',
    'src/bower_components/angular-mocks/angular-mocks.js',
    'src/js/**/*.js',
    'test/unit/**/*.js'
  ],
  autoWatch : true,
  usePolling: true,
  plugins : [
    'karma-chrome-launcher',
    'karma-phantomjs-launcher',
    'karma-jasmine',
    'karma-coverage'
  ],
  reporters: ['progress', 'coverage'],
  preprocessors: {
    'src/js/**/*.js': ['coverage']
  },
  coverageReporter: {
    type : 'html',
    dir : 'coverage/'
  }
};

var htmlPaths = [
  'src/slim/*.slim',
  'src/slim/partials/*.slim'
];
var scriptPaths = ['src/js/**/*.js'];
var cssPaths = ['src/scss/*.scss'];
var bowerPath = 'src/bower_components/'
var bowerJSPaths = [
  bowerPath + 'html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
  bowerPath + 'angular/angular.min.js',
  bowerPath + 'angular-route/angular-route.min.js',
  bowerPath + 'jquery/dist/jquery.min.js',
  bowerPath + 'bootstrap/dist/js/bootstrap.min.js',
  bowerPath + 'angular-loader/angular-loader.min.js'
];
var bowerCssPaths = [
  bowerPath + 'html5-boilerplate/css/*.css',
  bowerPath + 'bootstrap/dist/css/bootstrap.min.css',
  bowerPath + 'bootstrap/dist/css/bootstrap-theme.min.css'
];

gulp.task('img', function() {
  return gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('www/img/'));
});

gulp.task('html-main', function() {
  return gulp.src('src/slim/*.slim')
    .pipe(slim({ pretty: true }))
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest('www/'));
});

gulp.task('html-partials', function() {
  return gulp.src('src/slim/partials/*.slim')
    .pipe(slim({ pretty: true }))
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest('www/partials/'));
});

gulp.task('css', function() {
  return gulp.src(cssPaths)
    .pipe(sass())
    .pipe(minifyCSS({
      keepSpecialComments: 0
    }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('www/css/'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src(scriptPaths)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('www/js/'))
    .pipe(connect.reload());
});

gulp.task('bower', function() {
  return bower(bowerPath);
});

gulp.task('bower-js', function() {
  return gulp.src(bowerJSPaths)
    .pipe(gulp.dest('www/js/'));
});

gulp.task('bower-css', function() {
  return gulp.src(bowerCssPaths)
    .pipe(gulp.dest('www/css/'));
});

gulp.task('clean', function(cb) {
  return gulp.src('www')
    .pipe(clean());
});

gulp.task('connect', function() {
  return connect.server({
    root: 'www',
    port: port,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(htmlPaths, ['html']);
  gulp.watch(scriptPaths, ['scripts']);
  gulp.watch(cssPaths, ['css']);
});

gulp.task('html', ['html-main', 'html-partials']);
gulp.task('bower-app', ['bower-js', 'bower-css']);

gulp.task('webdriver-update', webdriver_update);

gulp.task('webdriver-standalone', webdriver_standalone);

gulp.task('e2e', ['webdriver-update'], function(callback) {
  return gulp.src('e2e/*.js')
    .pipe(protractor({
        configFile: "test/protractor-conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:' + port]
    }))
    .on('error', function(e) { throw e; });
});

gulp.task('test-single-run', function (done) {
  return karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), done);
});

gulp.task('tdd', function (done) {
  karma.start(karmaCommonConf, done);
});

gulp.task('run-android', ['build'], gshell.task([
  'phonegap local run android'
]));

gulp.task('build', function(callback) {
  return runSequence('clean',
    ['html', 'scripts', 'css', 'bower-app', 'img'], callback);
});

gulp.task('run', function(callback) {
  return runSequence(['build', 'connect', 'watch', 'tdd'], callback);
});

gulp.task('default', ['run']);
