'use strict';

describe('fixtures', function() {
  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures';
  });

  it('should return fixture', function() {
    var obj = getJSONFixture('test_fixture.json');
    expect(obj.fixtures).toEqual('load');
  })
});
