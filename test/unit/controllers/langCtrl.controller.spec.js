'use strict';

describe('controllers', function() {
  beforeEach(module('app'));

  describe('lang', function() {
    var ctrlName = 'LangCtrl';
    var ctrl;
    var i18n;

    beforeEach(function() {
      inject(function($injector, $controller) {
        ctrl = $controller(ctrlName);
        i18n = $injector.get('i18n');
      });
    });

    it('should changes locale', inject(function() {
      var locale = 'de';
      ctrl.setLang('ru');
      ctrl.setLang(locale);

      expect(i18n.getLang()).toEqual(locale);
    }));
  });
});
