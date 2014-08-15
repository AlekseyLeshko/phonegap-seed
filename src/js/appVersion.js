(function () {
  angular
    .module('myApp')
    .directive('appVersion', appVersion);

  function appVersion(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }
})();
