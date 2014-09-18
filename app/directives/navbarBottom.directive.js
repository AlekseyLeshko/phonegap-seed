(function() {
  'use strict';

  angular
    .module('app')
    .directive('navbarBottom', navbarBottom);

  navbarBottom.$inject = [];

  function navbarBottom() {
    var directive = {
      templateUrl: 'views/navbarBottom.html',
      restrict: 'EA'
    };
    return directive;
  }
})();
