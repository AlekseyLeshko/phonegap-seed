'use strict';

angular.module('myApp', [
  'ionic',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "partials/tabs.html"
    })
    .state('tabs.view1', {
      url: "/view1",
      views: {
        'view1-tab': {
          templateUrl: "partials/partial1.html",
          controller: 'MyCtrl1'
        }
      }
    })
    .state('tabs.view2', {
      url: "/view2",
      views: {
        'view2-tab': {
          templateUrl: "partials/partial2.html",
          controller: 'MyCtrl2'
        }
      }
    });

   $urlRouterProvider.otherwise("/tab/view1");
})
