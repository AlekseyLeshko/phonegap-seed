(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController' , AppController);

  AppController.$inject = ['$translate'];

  function AppController($translate) {
    var vm = this;
    vm.setLang = setLang;

    function setLang(langKey) {
      $translate.use(langKey);
    }
  }
})();
