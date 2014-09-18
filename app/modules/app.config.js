(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider.
      when('/view1', {
        templateUrl: 'views/partial1.html',
        controller: 'MyCtrl1 as myCtrl1'
      }).
      when('/view2', {
        templateUrl: 'views/partial2.html',
        controller: 'MyCtrl2 as myCtrl2'
      }).
      otherwise({
        redirectTo: '/view1'
      });
  }
})();
