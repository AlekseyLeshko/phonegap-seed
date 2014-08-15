(function() {
  angular
    .module('app')
    .value('version', version());

  function version() {
    var v = '0.1';
    return v;
  }
})();
