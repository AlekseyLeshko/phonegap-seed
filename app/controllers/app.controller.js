(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController' , AppController);

  AppController.$inject = [
    'appConfig'
  ];

  function AppController(appConfig) {
    var vm = this;
    vm.name = appConfig.name;
  }
})();
