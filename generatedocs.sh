#!/bin/sh

set -e
set -x

cd example
test -d export && rm -rf export/*
lux export
rm -rf ../gh-pages/*
cp -R export/* ../../gh-pages/
cd ..
