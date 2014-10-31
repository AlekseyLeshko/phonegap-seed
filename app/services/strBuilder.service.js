(function() {
  'use strict';

  angular
    .module('app')
    .service('strBuilderService', strBuilderService);

  strBuilderService.$inject = [];

  function strBuilderService() {
    /*jshint validthis:true */
    this.buildHello = function (str) {
      var hello = 'Hello, ';
      return hello + str;
    };
  }
})();
