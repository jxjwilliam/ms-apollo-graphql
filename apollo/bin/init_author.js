#!/usr/bin/env node

const { createStore } = require('../src/utils')

const authors = []

const { Author } = createStore()

db.sync({ force: false })
	.then(async () => {
		for (const author of authors) {
			await Author.create(author)
		}
	})
	.then(() => {
		console.log('Sync table and Seed Author successfully.')
	})
	.catch(err => console.error(err))
