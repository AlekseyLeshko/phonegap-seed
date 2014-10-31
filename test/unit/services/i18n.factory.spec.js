'use strict';

describe('i18n service', function() {
  beforeEach(module('app'));

  var i18n;
  var langKey;
  var $translate;

  beforeEach(function() {
    inject(function($injector) {
      i18n = $injector.get('i18n');
      $translate = $injector.get('$translate');
    });

    $translate.use = function(value) {
      langKey = value;
    }
    spyOn($translate, 'use').and.callThrough();
  });

  it('should set default lang', function() {
    var expected = 'en';

    expect(i18n.getLang()).toEqual(expected);
  });

  it('should set lang', function() {
    var locale = 'ru';

    i18n.setLang(locale);

    expect($translate.use).toHaveBeenCalled();
    expect(langKey).toEqual(locale);
    expect(i18n.getLang()).toEqual(locale);
  });
});
