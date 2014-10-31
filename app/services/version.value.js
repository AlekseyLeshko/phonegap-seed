(function() {
  'use strict';

  angular
    .module('app')
    .value('version', version());

  version.$inject = [];

  function version() {
    var v = '0.0.1';
    return v;
  }
})();
