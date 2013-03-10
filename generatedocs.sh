#!/bin/sh

set -e
set -x

cd example
test -d export && rm -rf export/*
presenteur export
rm -rf ../gh-pages/*
cp -R export/* ../../gh-pages/
cd ..
