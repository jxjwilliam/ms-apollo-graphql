#!/usr/bin/env bash

which sequelize >/dev/null
if [ $? = 1 ]; then
  sequelize=./node_modules/.bin/sequelize
fi

sequelize db:drop --env apollo

## create DB-Schema: apollo
sequelize db:create --env apollo
