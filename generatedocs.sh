#!/bin/sh

set -e
set -x

cd example
test -d export && rm -rf export/*
lux export
cd ..
rm -rf docs/*
cp -R example/export/ ./docs/
