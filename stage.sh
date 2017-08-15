#!/bin/bash
npm run build
cp -r ./dist/static/js/* ../../../laixi-server/laixi/laixi/assets/js/
cp -r ./dist/static/css/* ../../../laixi-server/laixi/laixi/assets/css/
