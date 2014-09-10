'use strict';

describe('controllers', function(){
  beforeEach(module('app'));

  it('should ....', inject(function($controller) {
    var myCtrl1 = $controller('MyCtrl1', { $scope: {} });
    expect(myCtrl1).toBeDefined();
  }));

  it('should ....', inject(function($controller) {
    var myCtrl2 = $controller('MyCtrl2', { $scope: {} });
    expect(myCtrl2).toBeDefined();
    var url = UrlBuilder.createSimpleUrl();
    expect(url).toBeDefined();
  }));
});
