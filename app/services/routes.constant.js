(function() {
  'use strict';

  angular
    .module('app')
    .constant('routes', routes());

  function routes() {
    var stateList = [];

    stateList = stateList.concat(getLangStateList());
    stateList = stateList.concat(getHomeStateList());

    return stateList;

    function getLangStateList() {
      var langStateList = [{
          name: 'lang',
          abstract: true,
          url: '/:lang',
          controller: 'LangController as langCtrl',
          template: '<ui-view/>'
        }
      ];
      return langStateList;
    }

    function getHomeStateList() {
      var langStateList = [{
          name: 'lang.home',
          url: '/home',
          templateUrl: '/views/home.html',
          controller: 'HomeController as homeCtrl'
        }
      ];
      return langStateList;
    }
  }
})();
