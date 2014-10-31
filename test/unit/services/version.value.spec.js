'use strict';

describe('version value service', function() {
  beforeEach(module('app'));

  var versionService;

  beforeEach(function() {
    inject(function($injector) {
      versionService = $injector.get('version');
    });
  });

  it('should return current version', function() {
    var expected = '0.0.1';

    expect(versionService).toEqual(expected);
  });
});
