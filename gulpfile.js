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
    js: pathBaseOnSrc('js/**/*.js')
  },
  build: {
    html: {
      main: pathBaseOnBuild(''),
      partials: pathBaseOnBuild('partials/')
    }
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
  path.app.html.main + '*.html'
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
    .pipe(gulp.dest(path.app.html.main));
});

gulp.task('minify-html-partials', function() {
  gulp.src(path.build.html.partials + '*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest(path.app.html.partials))
    .pipe(connect.reload());
});

gulp.task('css', function() {
  return gulp.src(path.src.sass)
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.app.css))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src(path.src.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(path.app.js))
    .pipe(connect.reload());
});

gulp.task('bower', function() {
  return bower(path.bower);
});

gulp.task('bower-app', ['bower-app-js', 'bower-app-css']);

gulp.task('bower-app-js', function() {
  gulp.src(path.bower + 'html5-boilerplate/js/vendor/modernizr-2.6.2.min.js')
    .pipe(gulp.dest(path.app.js));

  gulp.src(path.bower + 'angular/angular.min.js')
    .pipe(gulp.dest(path.app.js));

  gulp.src(path.bower + 'angular-route/angular-route.min.js')
    .pipe(gulp.dest(path.app.js));

  gulp.src(path.bower + 'jquery/dist/jquery.min.js')
    .pipe(gulp.dest(path.app.js));

  gulp.src(path.bower + 'bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(path.app.js));

  gulp.src(path.bower + 'angular-loader/angular-loader.min.js')
    .pipe(gulp.dest(path.app.js));
});

var pathBowerCss = [
  path.bower + 'html5-boilerplate/css/*.css',
  path.bower + 'bootstrap/dist/css/bootstrap.min.css',
  path.bower + 'bootstrap/dist/css/bootstrap-theme.min.css'
];
gulp.task('bower-app-css', function() {
  return gulp.src(pathBowerCss)
    .pipe(gulp.dest(path.app.css));
});

gulp.task('clean', function(cb) {
  return gulp.src(cleanArr)
    .pipe(clean());
});

gulp.task('connect', function() {
  connect.server({
    root: 'www',
    port: 9001,
    livereload: true
  });
});

gulp.task('slim', ['slim-main', 'slim-partials']);
gulp.task('minify-html', ['minify-html-main', 'minify-html-partials']);

gulp.task('minify', function(callback) {
  return runSequence(['minify-html'], callback);
});

gulp.task('watch', function() {
  gulp.watch([path.src.slim.main, path.src.slim.partials], ['update-html']);
  gulp.watch([path.src.js], ['scripts']);
  gulp.watch([path.src.sass], ['css']);
});

var karmaCommonConf = {
  basePath : '',
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

gulp.task('update-html', function(callback) {
  return runSequence('slim', 'minify-html', callback);
});

gulp.task('test-single-run', function (done) {
  karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), done);
});

gulp.task('tdd', function (done) {
  karma.start(karmaCommonConf, done);
});

gulp.task('run-android', ['build'], shell.task([
  'phonegap local run android'
]));

gulp.task('build', function(callback) {
  return runSequence('clean', ['update-html', 'scripts', 'css', 'bower-app'], callback);
});

gulp.task('run', function(callback) {
  return runSequence('build', ['connect', 'watch', 'tdd'], callback);
});

gulp.task('default', ['run']);
