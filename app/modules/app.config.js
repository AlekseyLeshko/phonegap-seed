(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider'
  ];

  function config($stateProvider, $urlRouterProvider, $translateProvider) {
    createRouting();
    createI18n();

    function createRouting() {
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
        .state('lang.view.id', {
          url: '/:id',
          templateUrl: getTemplateUrl,
          controllerProvider: ['$stateParams', getCtrlName]
        });

      function getTemplateUrl($stateParams) {
        var url = 'views/partial' + $stateParams.id + '.html';
        return url;
      }

      function getCtrlName($stateParams) {
        var id = $stateParams.id;
        var ctrlName = 'MyCtrl' + id + ' as myCtrl' + id;
        return ctrlName;
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
