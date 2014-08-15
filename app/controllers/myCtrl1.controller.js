(function() {
  angular
    .module('app')
    .controller('MyCtrl1' , MyCtrl1);

  function MyCtrl1() {
    var vm = this;
    vm.msg = 'Hello, ';
    vm.click = click;

    function click() {
      vm.msg += ' world!';
    }
  }
})();
