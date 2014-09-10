var karmaConfig = require('../gulp/configs/karma.json');

module.exports = function(config) {
  karmaConfig.basePath = '../';

  config.set(karmaConfig);
};
