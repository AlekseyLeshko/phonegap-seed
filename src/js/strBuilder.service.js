(function() {
  angular
    .module('myApp')
    .service('strBuilderService', strBuilderService);

  function strBuilderService() {
    this.buildHello = function (str) {
      var hello = 'Hello, ';
      return hello + str;
    };
  }
})();
