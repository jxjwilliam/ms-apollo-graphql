#!/usr/bin/env node

const { createStore } = require('../src/utils')

const authors = [
	{
		name: 'Douglas Crockford',
		desc: 'JavaScript',
	},
	{
		desc: 'erich-gamma',
		name: 'Erich Gamma',
	},
	{
		desc: 'richard-helm',
		name: 'Richard Helm',
	},
	{
		desc: 'ralph-johnson',
		name: 'Ralph Johnson',
	},
	{
		desc: 'john-vlissides',
		name: 'John Vlissides',
	},
	{
		desc: 'martin-fowler',
		name: 'Martin Fowler',
	},
	{
		desc: 'eric-evans',
		name: 'Eric Evans',
	},
	{
		desc: 'robert-martin',
		name: 'Robert C. Martin',
	},
]

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
