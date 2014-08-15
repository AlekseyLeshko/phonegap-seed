(function() {
  angular
    .module('myApp')
    .factory('strBuilderFactory', strBuilderFactory);

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
