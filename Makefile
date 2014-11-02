# Binaries we use
all: clean install_dependencies tests build

build:
	gulp build

tests:
	npm test

install_dependencies:
	npm install

clean:
	gulp clean

fullclean: clean
	rm -rf test/fixtures/views/
	rm -rf node_modules/
	rm -rf bower_components/
	rm -rf coverage/
	rm -rf platforms/
	rm -rf plugins/
	rm -rf merges/
