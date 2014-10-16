(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    'routes',
    'appConfig'
  ];

  function config($stateProvider, $urlRouterProvider, $translateProvider, routes, appConfig) {
    createRouting();
    createI18n();

    function createRouting() {
      var location = appConfig.location;
      $urlRouterProvider.otherwise('/' + location + '/view/1');

      for (var i = 0; i < routes.length; i++) {
        var state = routes[i];
        $stateProvider.state(state);
      }
    }

    function createI18n() {
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
  }
})();
