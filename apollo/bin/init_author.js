#!/usr/bin/env node

const { createStore } = require('../src/utils')

const authors = [{ name: 'Douglas Crockford', desc: 'JavaScript' }]

const { Author } = createStore()

Author.sync({ force: false })
	.then(async () => {
		// eslint-disable-next-line no-restricted-syntax
		for (const author of authors) {
			// eslint-disable-next-line no-await-in-loop
			await Author.create(author)
		}
	})
	.then(() => {
		console.log('Sync table and Seed Author successfully.')
	})
	.catch(err => console.error(err))
