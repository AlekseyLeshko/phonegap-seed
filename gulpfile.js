'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
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
var karma = require('karma').server;
var _ = require('lodash');
var protractor = require('gulp-protractor').protractor;
/*jshint camelcase: false */
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
/*jshint camelcase: false */
var webdriverUpdate = require('gulp-protractor').webdriver_update;
var sh = require('shelljs');
var bower = require('bower');
var gopen = require('gulp-open');

var port = 9001;

gulp.task('default', ['run']);

gulp.task('run', function(callback) {
  return runSequence(['build', 'connect', 'watch'], ['open-index', 'tdd'], callback);
});

gulp.task('build', function(callback) {
  return runSequence('clean', 'bower', ['test-single-run', 'slim', 'scripts', 'ionic', 'img'], 'scss', callback);
});

gulp.task('watch', function() {
  return gulp.watch('app/**/*.*', ['build-and-reload']);
});

gulp.task('build-and-reload', function(callback) {
  return runSequence('build', 'reload-app', callback);
});

gulp.task('reload-app', function() {
  return gulp.src('app/**/*.*')
    .pipe(connect.reload());
});

gulp.task('open-index', function(){
  var options = {
    url: 'http://localhost:' + port,
    app: 'google-chrome'
  };
  gulp.src('www/index.html')
  .pipe(gopen('', options));
});

var karmaCommonConf = {
  basepaths : '',
  browsers: ['Chrome'],
  frameworks: ['jasmine'],
  files : [
    'bower_components/ionic/js/ionic.bundle.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'app/**/*.js',
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
    'app/**/*.js': ['coverage']
  },
  coverageReporter: {
    type : 'html',
    dir : 'coverage/'
  }
};

gulp.task('tdd', function (done) {
  return karma.start(karmaCommonConf, done);
});

gulp.task('test-single-run', function (done) {
  return karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), done);
});

gulp.task('e2e', ['webdriver-update'], function(callback) {
  return gulp.src('e2e/*.js')
    .pipe(protractor({
        configFile: 'test/protractor-conf.js',
        args: ['--baseUrl', 'http://127.0.0.1:' + port]
    }))
    .on('error', function(e) { throw e; });
});

gulp.task('webdriver-standalone', webdriverStandalone);

gulp.task('webdriver-update', webdriverUpdate);

gulp.task('img', function(callback) {
  return runSequence(['png'], callback);
});

gulp.task('png', function() {
  return gulp.src('src/img/**/*.png')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [optipng()]
    }))
    .pipe(gulp.dest('www/img'));
});

gulp.task('slim', ['slim-main', 'slim-views']);

gulp.task('slim-main', function() {
  return gulp.src('app/*.slim')
    .pipe(slim({ pretty: true }))
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest('www/'));
});

gulp.task('slim-views', function() {
  return gulp.src('app/views/*.slim')
    .pipe(slim({ pretty: true }))
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest('www/views/'));
});

gulp.task('scss', function() {
  return gulp.src('app/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(minifyCSS({
      keepSpecialComments: 0
    }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('www/css/'));
});

gulp.task('jshint', function() {
  return gulp.src(['app/**/*.js', 'gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('scripts', ['jshint'], function() {
  return gulp.src(['app.module.js', 'app/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(uglify({mangle: true}))
    .pipe(concat('app-script.min.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('www/js/'));
});

gulp.task('ionic', function(callback) {
  return runSequence(['ionic-fonts', 'ionic-js'], callback);
});

gulp.task('ionic-fonts', function(cb) {
  return gulp.src('bower_components/ionic/fonts/**/*.*')
    .pipe(gulp.dest('www/fonts'));
});

gulp.task('ionic-js', function(cb) {
  return gulp.src('bower_components/ionic/js/ionic.bundle.js')
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
  sh.rm('-rf', 'www');
});

var cordovaConfig = {
  platforms: [
    'android'
  ],
  plugins: [
    'org.apache.cordova.console'
  ]
};

gulp.task('build-for-device', function(callback) {
  return runSequence('build', 'build-cordova', callback);
});

gulp.task('build-cordova', function(callback) {
  return runSequence('clean-cordova', 'install-platforms', 'install-plugins', callback);
});

gulp.task('install-platforms', function() {
  var platforms = cordovaConfig.platforms;
  for (var i = 0; i < platforms.length; i++) {
    var platform = platforms[i];
    var command = 'cordova platform add ' + platform;
    sh.echo('run comand: ' + command);
    sh.exec(command);
  }
});

gulp.task('install-plugins', function() {
  var plugins = cordovaConfig.plugins;
  for (var i = 0; i < plugins.length; i++) {
    var plugin = plugins[i];
    var command = 'cordova plugin add ' + plugin;
    sh.echo('run comand: ' + command);
    sh.exec(command);
  }
});

gulp.task('clean-cordova', function() {
  var cordovaPaths = [
    'platforms/',
    'plugins/'
  ];
  sh.rm('-rf', cordovaPaths);
});

gulp.task('emulate-to-android', ['build-for-device'], function() {
  sh.exec('cordova emulate android');
});

gulp.task('connect', function() {
  return connect.server({
    root: 'www',
    port: port,
    livereload: true
  });
});
