(function() {
  'use strict';

  angular
    .module('app')
    .directive('sidebar', sidebar);

  sidebar.$inject = [];

  function sidebar() {
    var directive = {
      templateUrl: 'views/sidebar.html',
      restrict: 'EA'
    };
    return directive;
  }
})();
