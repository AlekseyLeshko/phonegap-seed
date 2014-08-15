(function() {
  'use strict';

  angular
    .module('app')
    .service('strBuilderService', strBuilderService);

  function strBuilderService() {
    /*jshint validthis:true */
    this.buildHello = function (str) {
      var hello = 'Hello, ';
      return hello + str;
    };
  }
})();
