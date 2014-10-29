var UrlBuilder = (function() {
  'use strict';

  var createSimpleUrl = function() {
    var url = 'http://www.simple.com/';

    return url;
  }

  var UrlBuilder = {
    createSimpleUrl: createSimpleUrl
  };

  return UrlBuilder;
})();
