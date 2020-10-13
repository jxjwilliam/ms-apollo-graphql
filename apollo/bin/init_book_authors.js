#!/usr/bin/env node

const { createStore } = require('../src/utils')

const book_authors = [
	{
		bookId: 1,
		authorId: 1,
	},
	{
		bookId: 2,
		authorId: 1,
	},
	{
		bookId: 2,
		authorId: 2,
	},
]

const { BookAuthor } = createStore()

BookAuthor.sync({ force: false })
	.then(async () => {
		// eslint-disable-next-line no-restricted-syntax
		for await (const ba of book_authors) {
			BookAuthor.create(ba)
		}
	})
	.then(() => {
		console.log('Sync table and Seed Book successfully.')
	})
	.catch(err => console.error(err))
