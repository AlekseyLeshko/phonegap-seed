var Config = require('./config');
var bail = require('./bail');

var mainConfigFileName = './config/app.json';
var mainConfig = new Config(mainConfigFileName);

var configFileNames = ['package.json', 'bower.json'];
var configs = [];

for (var i = 0; i < configFileNames.length; i++) {
  var fileName = configFileNames[i];
  var config = new Config(fileName);
  config.updateJson(mainConfig);
  config.save();
}
console.log(true);
