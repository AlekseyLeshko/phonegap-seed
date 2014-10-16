(function() {
  'use strict';

  angular
    .module('app')
    .constant('appConfig', appConfig());

  function appConfig() {
    var config = {
      name: 'PhoneGap-seed',
      location: 'en'
    };

    return config;
  }
})();
