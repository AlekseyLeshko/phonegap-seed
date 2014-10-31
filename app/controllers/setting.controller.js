(function() {
  'use strict';

  angular
    .module('app')
    .controller('SettingController' , SettingController);

  SettingController.$inject = [
    'strBuilderService',
    'strBuilderFactory'
  ];

  function SettingController(strBuilderService, strBuilderFactory) {
    var vm = this;
    vm.msg = strBuilderService.buildHello('World!');
    vm.msg += ' : ' + strBuilderFactory.buildHello('World!');
  }
})();
