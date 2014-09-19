(function() {
  'use strict';

  angular
    .module('app')
    .controller('LangCtrl' , LangCtrl);

  LangCtrl.$inject = ['$stateParams', 'i18n'];

  function LangCtrl($stateParams, i18n) {
    var vm = this;
    vm.setLang = setLang;

    setLang($stateParams.lang);

    function setLang(langKey) {
      i18n.setLang(langKey);
    }
  }
})();
