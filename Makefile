SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

test:
	@mocha --harmony --reporter spec

clean:
	@rm -rf node_modules

.PHONY: test clean
