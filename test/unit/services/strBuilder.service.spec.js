'use strict';

describe('strBuilder service', function() {
  beforeEach(module('app'));

  var strBuilderService;

  beforeEach(function() {
    inject(function($injector) {
      strBuilderService = $injector.get('strBuilderService');
    });
  });

  it('should build string', function() {
    var expected = 'Hello, world!';

    var str = strBuilderService.buildHello('world!');

    expect(str).toEqual(expected);
  });
});
