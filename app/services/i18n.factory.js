(function() {
  'use strict';

  angular
    .module('app')
    .factory('i18n', i18n);

  i18n.$inject = ['$translate'];

  function i18n($translate) {
    var currentLang = getDefaultLang();

    var factory = {
      setLang: setLang,
      getLang: getLang
    };
    return factory;

    function setLang(langKey) {
      currentLang = langKey;
      $translate.use(currentLang);
    }

    function getLang() {
      return currentLang;
    }

    function getDefaultLang() {
      var defaultLang = 'en';
      return defaultLang;
    }
  }
})();
