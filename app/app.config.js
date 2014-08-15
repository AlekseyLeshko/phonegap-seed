(function() {
  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tabs', {
        url: '/tab' ,
        abstract: true,
        templateUrl: 'views/tabs.html'
      })
      .state('tabs.view1', {
        url: '/view1',
        views: {
          'view1-tab': {
            templateUrl: 'views/partial1.html',
            controller: 'MyCtrl1 as myCtrl1'
          }
        }
      })
      .state('tabs.view2', {
        url: '/view2',
        views: {
          'view2-tab': {
            templateUrl: 'views/partial2.html',
            controller: 'MyCtrl2 as myCtrl2'
          }
        }
      });

    $urlRouterProvider.otherwise('/tab/view1');
  }
})();
