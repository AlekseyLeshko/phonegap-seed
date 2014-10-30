(function() {
  'use strict';

  angular
    .module('app')
    .controller('LangController' , LangController);

  LangController.$inject = [
    '$stateParams',
    'i18n'
  ];

  function LangController($stateParams, i18n) {
    var vm = this;
    vm.setLang = setLang;

    setLang($stateParams.lang);

    function setLang(langKey) {
      i18n.setLang(langKey);
    }
  }
})();
