(function() {
  angular
    .module('myApp')
    .filter('interpolate', interpolate);

  function interpolate(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }
})();
