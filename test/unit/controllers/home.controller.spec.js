'use strict';

describe('HomeController controller', function() {
  beforeEach(module('app'));

  var ctrl;

  beforeEach(function() {
    var ctrlName = 'HomeController';
    inject(function($controller) {
      ctrl = $controller(ctrlName);
    });
  });

  it('should init', function() {
    expect(ctrl.msg).toEqual('Hello, ');
    expect(ctrl.click).toBeDefined();
  });

  it('should click add \'world\' word for msg', function() {
    var msg = 'Hello, ';
    expect(ctrl.msg).toEqual(msg);

    ctrl.click();

    msg += 'world!';
    expect(ctrl.msg).toEqual(msg);
  });
});
