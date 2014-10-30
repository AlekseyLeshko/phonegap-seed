(function() {
  'use strict';

  angular
    .module('app')
    .constant('routes', routes());

  function routes() {
    var stateList = [];

    stateList = stateList.concat(getLangStateList());
    stateList = stateList.concat(getViewStatelist());

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

    function getViewStatelist() {
      var externalStatelist = [{
          name: 'lang.view',
          abstract: true,
          url: '/view',
          template: '<ui-view/>'
        }, {
          name: 'lang.view.id',
          url: '/:id',
          templateUrl: getTemplateUrl,
          controllerProvider: ['$stateParams', getCtrlName]
        }];

      return externalStatelist;
    }

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
})();
