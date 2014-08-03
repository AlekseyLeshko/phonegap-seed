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
var shell = require('gulp-shell');
var bower = require('gulp-bower');
var karma = require('karma').server;
var _ = require('lodash');
var protractor = require("gulp-protractor").protractor;

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

var paths = {
  src: {
    slim: {
      main: 'src/slim/*.slim',
      partials: 'src/slim/partials/*.slim'
    },
    sass: 'src/scss/*.scss',
    js: 'src/js/**/*.js'
  },
  app: {
    html: {
      main: 'www/',
      partials: 'www/partials/'
    },
    css: 'www/css/',
    js: 'www/js/',
    maps: 'maps'
  },
  bower: 'src/bower_components/'
};

var fileNames = {
  script: 'all.min.js',
  css: 'style.css'
};

var bowerJspathss = [
  paths.bower + 'html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
  paths.bower + 'angular/angular.min.js',
  paths.bower + 'angular-route/angular-route.min.js',
  paths.bower + 'jquery/dist/jquery.min.js',
  paths.bower + 'bootstrap/dist/js/bootstrap.min.js',
  paths.bower + 'angular-loader/angular-loader.min.js'
];
var bowerCsspathss = [
  paths.bower + 'html5-boilerplate/css/*.css',
  paths.bower + 'bootstrap/dist/css/bootstrap.min.css',
  paths.bower + 'bootstrap/dist/css/bootstrap-theme.min.css'
];

var cleanpathss = [
  paths.app.html.partials,
  paths.app.css,
  paths.app.js,
  paths.app.html.main + '*.html'
];

gulp.task('html-main', function() {
  return gulp.src(paths.src.slim.main)
    .pipe(slim({ pretty: true }))
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest(paths.app.html.main));
});

gulp.task('html-partials', function() {
  return gulp.src(paths.src.slim.partials)
    .pipe(slim({ pretty: true }))
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest(paths.app.html.partials));
});

gulp.task('css', function() {
  return gulp.src(paths.src.sass)
    .pipe(sass())
    .pipe(concat(fileNames.css))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.app.css))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src(paths.src.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat(fileNames.script))
    .pipe(sourcemaps.write(paths.app.maps))
    .pipe(gulp.dest(paths.app.js))
    .pipe(connect.reload());
});

gulp.task('bower', function() {
  return bower(paths.bower);
});

gulp.task('bower-js', function() {
  return gulp.src(bowerJspathss)
    .pipe(gulp.dest(paths.app.js));
});

gulp.task('bower-css', function() {
  return gulp.src(bowerCsspathss)
    .pipe(gulp.dest(paths.app.css));
});

gulp.task('clean', function(cb) {
  return gulp.src(cleanpathss)
    .pipe(clean());
});

gulp.task('connect', function() {
  return connect.server({
    root: 'www',
    port: 9001,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch([paths.src.slim.main, paths.src.slim.partials], ['html']);
  gulp.watch([paths.src.js], ['scripts']);
  gulp.watch([paths.src.sass], ['css']);
});

gulp.task('html', ['html-main', 'html-partials']);
gulp.task('bower-app', ['bower-js', 'bower-css']);

gulp.task('test-single-run', function (done) {
  return karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), done);
});

gulp.task('e2e', function(callback) {
  gulp.src(paths.src.js)
    .pipe(protractor({
        configFile: "./test/protractor.config.js",
        args: ['--baseUrl', 'http://127.0.0.1:8000']
    }));
});

gulp.task('tdd', function (done) {
  karma.start(karmaCommonConf, done);
});

gulp.task('run-android', ['build'], shell.task([
  'phonegap local run android'
]));

gulp.task('build', function(callback) {
  return runSequence('clean',
    ['html', 'scripts', 'css', 'bower-app'], callback);
});

gulp.task('run', function(callback) {
  return runSequence(['build', 'connect', 'watch', 'tdd'], callback);
});

gulp.task('default', ['run']);
