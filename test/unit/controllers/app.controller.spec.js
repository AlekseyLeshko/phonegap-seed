'use strict';

describe('app controller', function() {
  beforeEach(module('app'));

  var ctrl;
  var appConfig;

  beforeEach(function() {
    var ctrlName = 'AppController';
    var name = 'appName';
    appConfig = {
      name: name
    };
    var injectObj = {
      appConfig: appConfig
    };
    inject(function($controller) {
      ctrl = $controller(ctrlName, injectObj);
    });
  });

  it('should app name', function() {
    expect(ctrl.name).toEqual(appConfig.name);
  });
});
