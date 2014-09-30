var Config = require('./config');
var bail = require('./bail');

var mainConfig = './config/app.json';
var config = new Config(mainConfig);
config.check();
console.log(true);
