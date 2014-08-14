module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'src/bower_components/ionic/js/ionic.bundle.js',
      'src/bower_components/angular-mocks/angular-mocks.js',
      'src/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,
    usePolling: true,

    frameworks: ['jasmine'],

    browsers : [
      'Chrome',
      'PhantomJS'
    ],

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
      reporters:[
        {
          type: 'html',
          dir:'coverage/'
        }
      ]
    },

    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          }
        },
        flags: ['--remote-debugger-port=9000']
      }
    }
  });
};
