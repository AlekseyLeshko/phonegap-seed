'use strict';

describe('Setting controller', function() {
  beforeEach(module('app'));

  var ctrl;
  var strBuilderService;
  var strBuilderFactory;

  beforeEach(function() {
    var ctrlName = 'SettingController';

    var buildHello = function (msg) {
      return 'Hello, ' + msg;
    };
    strBuilderService = {
      buildHello: buildHello
    };
    strBuilderFactory = {
      buildHello: buildHello
    };

    spyOn(strBuilderService, 'buildHello').and.callThrough();
    spyOn(strBuilderFactory, 'buildHello').and.callThrough();

    var injectObj = {
      strBuilderService: strBuilderService,
      strBuilderFactory: strBuilderFactory
    };
    inject(function($injector, $controller) {
      ctrl = $controller(ctrlName, injectObj);
    });
  });

  it('should init', function() {
    var expected = 'Hello, World! : Hello, World!';
    expect(strBuilderService.buildHello).toHaveBeenCalled();
    expect(strBuilderFactory.buildHello).toHaveBeenCalled();
    expect(ctrl.msg).toEqual(expected);
  });
});
