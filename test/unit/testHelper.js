'use strict';

describe('test helper', function() {
  it('should return simple url', function() {
    var url = UrlBuilder.createSimpleUrl();
    expect(url).toBeDefined();
  })
});
