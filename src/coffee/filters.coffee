"use strict"

# Filters
angular.module("myApp.filters", []).filter "interpolate", [
  "version"
  (version) ->
    return (text) ->
      String(text).replace /\%VERSION\%/g, version
]
