.DEFAULT_TARGET: all
.PHONY: all

# Binaries we use
all: install_dependencies clean tests build

build:
	gulp build

tests:
	npm test

install_dependencies:
	npm install

clean:
	gulp fullclean

fullclean: clean
	rm -rf node_modules/
	rm -rf bower_components/
