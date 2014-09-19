(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider'];

  function config($stateProvider, $urlRouterProvider, $translateProvider) {
    var defaultLang = 'en';
    $urlRouterProvider.otherwise('/' + defaultLang + '/view/1');

    $stateProvider
      .state('lang', {
        abstract: true,
        url: '/:lang',
        controller: 'LangCtrl as langCtrl',
        template: '<ui-view/>'
      })
      .state('lang.view', {
        abstract: true,
        url: '/view',
        template: '<ui-view/>'
      })
      .state('lang.view.first', {
        url: '/1',
        templateUrl: 'views/partial1.html',
        controller: 'MyCtrl1 as myCtrl1'
      })
      .state('lang.view.second', {
        url: '/2',
        templateUrl: 'views/partial2.html',
        controller: 'MyCtrl2 as myCtrl2'
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
