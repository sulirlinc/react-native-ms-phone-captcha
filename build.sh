#!/bin/bash

rm -rf ./dist
mkdir dist
mkdir dist/res
cp -r ./src/res ./dist/
tsc
