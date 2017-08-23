#!/bin/bash
npm run build
cp -r ./dist/static/js/* ../../../laixi-server/laixi/laixi/assets/js/
cp -r ./dist/static/css/* ../../../laixi-server/laixi/laixi/assets/css/
pushd ../../../laixi-server/laixi/; FLASK_APP=wsgi_dev.py flask sync_assets; popd
