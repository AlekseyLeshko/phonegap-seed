'use strict';

describe('my app', function() {
  browser.get('index.html');

  describe('setting page', function() {
    beforeEach(function() {
      browser.get('index.html#/en/setting');
    });

    it('should render view2 when user navigates to /view2', function() {
      var expected = /partial for view 2/;
      var el = element.all(by.css('.scrollable-content')).last();
      var text = el.getText();
      expect(text).toMatch(expected);
    });
  });
});
