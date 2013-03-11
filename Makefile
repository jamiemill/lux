test:
	mocha

watch:
	mocha --watch

# Tell make not to expect artifacts to be created for these:
.PHONY: test watch
