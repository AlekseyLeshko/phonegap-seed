# Binaries we use
all: clean install_dependencies tests build

build:
	gulp build

tests:
	npm test

install_dependencies: install_global_module node_modules check_module

node_modules:
	npm install

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
	rm -rf test/fixtures/views/
	rm -rf node_modules/
	rm -rf bower_components/
	rm -rf coverage/
	rm -rf platforms/
	rm -rf plugins/
	rm -rf merges/
