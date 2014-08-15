(function() {
  angular
    .module('app')
    .controller('MyCtrl2' , MyCtrl2);

  MyCtrl2.$inject = ['strBuilderService', 'strBuilderFactory'];

  function MyCtrl2(strBuilderService, strBuilderFactory) {
    var vm = this;
    vm.msg = strBuilderService.buildHello('World!');
    vm.msg += ' : ' + strBuilderFactory.buildHello('World!');
  }
})();
