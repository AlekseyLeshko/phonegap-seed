'use strict';

describe('appConfig constant', function() {
  beforeEach(module('app'));

  var appConfig;

  beforeEach(inject(function($injector) {
    appConfig = $injector.get('appConfig');
  }));

  it('appConfig', function() {
    expect(appConfig.name).toEqual('PhoneGap-seed');
    expect(appConfig.location).toEqual('en');
  });
});
