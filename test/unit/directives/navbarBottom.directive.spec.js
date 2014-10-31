'use strict';

describe('navbarBottom directive', function() {
  beforeEach(module('app'));

  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');
  }));

  beforeEach(function() {
    Includer.includeHtml();
  });

  it('should ', function() {
    var fileName = 'navbarBottom.html';
    var fixture = jasmine.getFixtures().read(fileName);

    $httpBackend.expectGET('views/' + fileName).respond(fixture);
    $httpBackend.expectGET('/views/home.html').respond();

    var element = $compile('<navbar-bottom></navbar-bottom>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    var $html = $(element);
    expect($html.find('a').size()).toEqual(2);
  });
});
