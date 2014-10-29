var Includer = (function() {
  'use strict';

  function includeJson() {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/json';
  }

  function includeHtml() {
    jasmine.getFixtures().fixturesPath = 'base/test/fixtures/views';
  }

  var Includer = {
    includeJson: includeJson,
    includeHtml: includeHtml
  };

  return Includer;
})();
