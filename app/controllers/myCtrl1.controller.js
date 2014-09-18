(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyCtrl1' , MyCtrl1);

  MyCtrl1.$inject = ['$translate'];

  function MyCtrl1($translate) {
    var vm = this;
    vm.msg = 'Hello, ';
    vm.click = click;
    vm.setLang = setLang;

    function click() {
      vm.msg += ' world!';
    }

    function setLang(langKey) {
      $translate.use(langKey);
    }
  }
})();
