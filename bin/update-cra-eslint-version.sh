#!/usr/bin/env bash

cd client/node_modules/react-scripts/

vim package.json
 "eslint": "^6.6.0", ->   "eslint": "^7.9.0",

yarn install

cd -

# make sure comment out in client/.env if having.
# SKIP_PREFLIGHT_CHECK=true