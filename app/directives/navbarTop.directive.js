(function() {
  'use strict';

  angular
    .module('app')
    .directive('navbarTop', navbarTop);

  navbarTop.$inject = [];

  function navbarTop() {
    var directive = {
      templateUrl: 'views/navbarTop.html',
      restrict: 'EA'
    };
    return directive;
  }
})();
