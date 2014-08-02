module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'src/bower_components/angular/angular.js',
      'src/bower_components/angular-route/angular-route.js',
      'src/bower_components/angular-mocks/angular-mocks.js',
      'src/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,
    usePolling: true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ]
  });
};
