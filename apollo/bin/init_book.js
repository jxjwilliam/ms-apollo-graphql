#!/usr/bin/env node

const path = require('path')

const basename = path.resolve(path.join(__dirname, '..'))

const { Book } = require(`${basename}/models/index`)

Book.sync({ force: true }).catch(err => console.error(err))
