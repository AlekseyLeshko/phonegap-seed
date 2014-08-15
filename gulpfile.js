'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var rimraf = require('gulp-rimraf');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var slim = require('gulp-slim');
var minifyHTML = require('gulp-minify-html');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var optipng = require('imagemin-optipng');
var gshell = require('gulp-shell');
var karma = require('karma').server;
var _ = require('lodash');
var protractor = require("gulp-protractor").protractor;
var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
var webdriver_update = require("gulp-protractor").webdriver_update;
var sh = require('shelljs');
var bower = require('bower');

var port = 9001;

var karmaCommonConf = {
  basepaths : '',
  browsers: ['Chrome'],
  frameworks: ['jasmine'],
  files : [
    'src/bower_components/ionic/js/ionic.bundle.js',
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

gulp.task('img', function() {
  return gulp.src('src/img/**/*.png')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [optipng()]
    }))
    .pipe(gulp.dest('www/img'));
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
    .pipe(uglify({mangle: true}))
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('www/js/'))
    .pipe(connect.reload());
});

gulp.task('ionic', function(callback) {
  return runSequence(['ionic-fonts', 'ionic-js'], callback);
});

gulp.task('ionic-fonts', function(cb) {
  return gulp.src('src/bower_components/ionic/fonts/**/*.*')
    .pipe(gulp.dest('www/fonts'));
});

gulp.task('ionic-js', function(cb) {
  return gulp.src('src/bower_components/ionic/js/ionic.bundle.js')
    .pipe(gulp.dest('www/js/lib'));
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('bower', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('clean', function() {
  return gulp.src('www', { read: false })
    .pipe(rimraf());
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
  return runSequence('clean', 'bower', ['html', 'scripts', 'ionic', 'img'], 'css', callback);
});

gulp.task('run', function(callback) {
  return runSequence(['build', 'connect', 'watch', 'tdd'], callback);
});

gulp.task('default', ['run']);
