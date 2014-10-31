'use strict';

describe('navbarTop directive', function() {
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

  it('should directive have \'div\' tags', function() {
    var fileName = 'navbarTop.html';
    var fixture = jasmine.getFixtures().read(fileName);

    $httpBackend.expectGET('views/' + fileName).respond(fixture);

    var element = $compile('<navbar-top></navbar-top>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    var $html = $(element);
    expect($html).toContainText('user');
    expect($html.find('.navbar-brand.navbar-brand-center')).toBeDefined();
    expect($html.find('.btn-group.pull-left')).toBeDefined();
    expect($html.find('.btn-group.pull-right')).toBeDefined();
  });
});
