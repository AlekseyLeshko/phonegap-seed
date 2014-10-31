'use strict';

describe('strBuilder factory', function() {
  beforeEach(module('app'));

  var strBuilderFactory;

  beforeEach(function() {
    inject(function($injector) {
      strBuilderFactory = $injector.get('strBuilderFactory');
    });
  });

  it('should build string', function() {
    var expected = 'Hello, world!';

    var str = strBuilderFactory.buildHello('world!');

    expect(str).toEqual(expected);
  });
});
