(function () {
  angular
    .module('myApp')
    .controller('MyCtrl1' , MyCtrl1);

  function MyCtrl1() {
    var vm = this;
    vm.msg = 'Hello, ';
  }
})();
