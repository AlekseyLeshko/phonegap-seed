'use strict';

describe('app controller', function() {
  beforeEach(module('app'));

  var ctrlName = 'AppController';
  var ctrl;
  var appConfig;

  beforeEach(function() {
    inject(function($injector, $controller) {
      ctrl = $controller(ctrlName);
      appConfig = $injector.get('appConfig');
    });
  });

  it('should app name', function() {
    expect(ctrl.name).toEqual(appConfig.name);
  });
});
