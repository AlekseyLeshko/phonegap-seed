(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$ionicPlatform'];

  function run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }
})();
