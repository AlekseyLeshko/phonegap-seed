(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController' , HomeController);

  HomeController.$inject = [];

  function HomeController() {
    var vm = this;
    vm.msg = 'Hello, ';
    vm.click = click;

    function click() {
      vm.msg += 'world!';
    }
  }
})();
