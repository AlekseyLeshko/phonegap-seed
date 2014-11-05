'use strict';

describe('my app', function() {
  browser.get('index.html');

  describe('home page', function() {
    beforeEach(function() {
      browser.get('index.html#/en/home');
    });

    afterEach(function() {
      browser.get('index.html#/en/home');
    });

    it('should render page have text', function() {
      var expected = /partial for view 1/;
      var el = element.all(by.css('.container')).first();
      var text = el.getText();
      expect(text).toMatch(expected);
    });

    it('should choice location', function() {
      var expected = 'Hello';
      var el = element.all(by.css('.row.text-center h1')).first();
      var text = el.getText();
      expect(text).toMatch(expected);

      var button = element.all(by.css('.btn.btn-primary')).get(1);
      button.click();

      browser.waitForAngular();

      expected = 'Привет';
      el = element.all(by.css('.row.text-center h1')).first();
      text = el.getText();
      expect(text).toMatch(expected);
    });


    it('should button click', function() {
      var expected = 'Hello,';
      var el = element(by.binding('homeCtrl.msg'));
      expect(el.getText()).toMatch(expected);

      var button = element.all(by.css('.btn.btn-primary')).get(3);
      button.click();

      browser.waitForAngular();

      expected = 'Hello, world!';
      expect(el.getText()).toMatch(expected);
    });
  });
});
