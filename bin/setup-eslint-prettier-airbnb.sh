#!/usr/bin/env bash

exec 3<&1;bash <&3 <(curl https://raw.githubusercontent.com/paulolramos/eslint-prettier-airbnb-react/master/eslint-prettier-config.sh 2> /dev/null)
