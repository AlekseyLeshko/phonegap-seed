(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$routeProvider', '$translateProvider'];

  function config($routeProvider, $translateProvider) {
    $routeProvider.
      when('/:lang/view1', {
        templateUrl: 'views/partial1.html',
        controller: 'MyCtrl1 as myCtrl1'
      }).
      when('/:lang/view2', {
        templateUrl: 'views/partial2.html',
        controller: 'MyCtrl2 as myCtrl2'
      }).
      otherwise({
        redirectTo: 'en/view1'
      });

    $translateProvider.translations('en', {
      'TITLE': 'Hello',
      'FOO': 'This is a paragraph'
    });

    $translateProvider.translations('de', {
      'TITLE': 'Hallo',
      'FOO': 'Dies ist ein Paragraph'
    });

    $translateProvider.translations('ru', {
      'TITLE': 'Привет',
      'FOO': 'Это параграф'
    });

    $translateProvider.preferredLanguage('en');
  }
})();
