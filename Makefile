.DEFAULT_TARGET: all
.PHONY: all

all: install_dependencies clean tests build

install_dependencies: install_global_module
	npm install

install_say_me:
	npm install -g say-me

install_global_module: install_say_me
	@$(call install_npm_module,gulp,-g)
	@$(call install_npm_module,bower,-g)
	@$(call install_npm_module,karma-cli,-g)
	@$(call install_npm_module,npm-check-updates,-g)

tests:
	gulp create-html-fixtures
	karma start test/karma.conf.js --single-run --browsers PhantomJS

build:
	gulp build

clean:
	gulp fullclean

fullclean: clean
	rm -rf node_modules/
	rm -rf bower_components/

define install_npm_module
	$(eval IS_INSTALLED = $(shell say-me --npmmii $(2) -p $(1)))
	@if [ $(IS_INSTALLED) = "false" ] ; then \
		echo "installing $(1)"; \
		npm install $(2) $(1); \
	fi
	@echo "$(1) is installed"
endef
