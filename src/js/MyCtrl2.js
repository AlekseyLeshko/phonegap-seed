(function() {
  angular
    .module('myApp')
    .controller('MyCtrl2' , MyCtrl2);

  function MyCtrl2(strBuilderService) {
    var vm = this;
    vm.msg = strBuilderService.buildHello('World!');
  }
})();
