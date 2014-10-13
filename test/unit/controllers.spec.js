'use strict';

describe('controllers', function(){
  beforeEach(module('app'));

  describe('test helper', function() {
    it('should return simple url', function() {
      var url = UrlBuilder.createSimpleUrl();
      expect(url).toBeDefined();
    })
  });

  describe('fixtures', function() {
    beforeEach(function() {
      jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures';
    });

    it('should return fixture', function() {
      var obj = getJSONFixture('test_fixture.json');
      expect(obj.fixtures).toEqual('load');
    })
  });
});
