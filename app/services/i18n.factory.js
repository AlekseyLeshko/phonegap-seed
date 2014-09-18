(function() {
  'use strict';

  angular
    .module('app')
    .factory('i18n', i18n);

  i18n.$inject = ['$translate'];

  function i18n($translate) {
    var factory = {
      setLang: setLang
    };
    return factory;

    function setLang(langKey) {
      $translate.use(langKey);
    }
  }
})();
