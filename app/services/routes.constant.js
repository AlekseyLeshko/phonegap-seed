(function() {
  'use strict';

  angular
    .module('app')
    .constant('routes', routes());

  function routes() {
    var stateList = [];

    stateList = stateList.concat(getLangStateList());
    stateList = stateList.concat(getHomeStateList());
    stateList = stateList.concat(getSettingStateList());

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

    function getSettingStateList() {
      var langStateList = [{
          name: 'lang.setting',
          url: '/setting',
          templateUrl: '/views/setting.html',
          controller: 'SettingController as settingCtrl'
        }
      ];
      return langStateList;
    }
  }
})();
