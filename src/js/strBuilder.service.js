(function() {
  angular
    .module('app')
    .service('strBuilderService', strBuilderService);

  function strBuilderService() {
    this.buildHello = function (str) {
      var hello = 'Hello, ';
      return hello + str;
    };
  }
})();
