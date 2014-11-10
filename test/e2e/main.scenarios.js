'use strict';

describe('my app', function() {
  browser.get('index.html');

  it('should automatically redirect to default url /home with en location', function() {
    var defaultUrl = '/en/home';
    var url = browser.getLocationAbsUrl();

    expect(url).toMatch(defaultUrl);
  });
});
