(function() {
  'use strict';

  angular
    .module('app')
    .factory('strBuilderFactory', strBuilderFactory);

  strBuilderFactory.$inject = [];

  function strBuilderFactory () {
    var factory = {
      buildHello: buildHello
    };
    return factory;

    function buildHello(str) {
      var hello = 'Hello, ';
      return hello + str;
    }
  }
})();
