#!/usr/bin/env node
const { createStore } = require('../utils')

const { db } = createStore()
db.sync({ force: true }).then(() => {
	db.close()
})
