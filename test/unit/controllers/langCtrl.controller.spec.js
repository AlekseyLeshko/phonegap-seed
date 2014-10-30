'use strict';

describe('lang controller', function() {
  beforeEach(module('app'));

  var ctrl;
  var i18n;
  var langKey;

  beforeEach(function() {
    var ctrlName = 'LangCtrl';
    i18n = {
      setLang: function (value) {
        langKey = value;
      }
    };
    spyOn(i18n, 'setLang').and.callThrough();

    var injectObj = {
      i18n: i18n
    };
    inject(function($controller) {
      ctrl = $controller(ctrlName, injectObj);
    });
  });

  it('should changes locale', inject(function() {
    var locale = 'de';
    ctrl.setLang('ru');
    ctrl.setLang(locale);

    expect(i18n.setLang).toHaveBeenCalled();
    expect(langKey).toEqual(locale);
  }));
});
