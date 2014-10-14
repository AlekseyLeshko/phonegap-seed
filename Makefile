# Binaries we use
all: clean install_dependencies tests build

build:
	gulp build

tests:
	karma start test/karma.conf.js --single-run --browsers PhantomJS

install_dependencies: install_global_module node_modules bower_components check_module

node_modules:
	npm install

bower_components:
	bower install

install_global_module:
	npm install -g gulp
	npm install -g bower
	npm install -g karma-cli
	npm install -g npm-check-updates

check_module:
	npm-check-updates

clean:
	rm -rf www/

fullclean: clean
	rm -rf node_modules/
	rm -rf bower_components/
	rm -rf coverage/
	rm -rf platforms/
	rm -rf plugins/
	rm -rf merges/
