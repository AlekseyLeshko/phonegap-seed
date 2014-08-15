(function () {
  angular
    .module('myApp')
    .controller('MyCtrl2' , MyCtrl2);

  function MyCtrl2() {
    var vm = this;
    vm.msg = 'World!';
  }
})();
