'use strict';

describe('interpolate filter', function() {
  beforeEach(module('app'));

  var interpolateFilter;

  beforeEach(function() {
    module(function($provide) {
      $provide.value('version', 'TEST_VER');
    });

    inject(function($injector) {
      interpolateFilter = $injector.get('interpolateFilter');
    });
  });

  it('should replace VERSION', function() {
    var extected = 'before TEST_VER after';
    var str = interpolateFilter('before %VERSION% after');

    expect(str).toEqual(extected);
  });
});
