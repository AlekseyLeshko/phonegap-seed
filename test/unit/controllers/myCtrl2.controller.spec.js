'use strict';

describe('MyCtrl2 controller', function() {
  beforeEach(module('app'));

  var ctrlName = 'MyCtrl2';
  var ctrl;

  beforeEach(function() {
    inject(function($injector, $controller) {
      ctrl = $controller(ctrlName);
    });
  });

  it('should init', function() {
    expect(ctrl.msg).toEqual('Hello, World! : Hello, World!');
  });
});
