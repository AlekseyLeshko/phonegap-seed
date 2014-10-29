'use strict';

describe('fixtures', function() {
  beforeEach(function() {
    Includer.includeJson();
  });

  it('should return fixture', function() {
    var obj = getJSONFixture('test_fixture.json');
    expect(obj.fixtures).toEqual('load');
  })
});
