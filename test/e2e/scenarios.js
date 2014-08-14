'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/tab/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('ion-content p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/tab/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('ion-content p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
