#!/usr/bin/env node

const { createStore } = require('../src/utils')

const publishers = [
	{
		desc: 'addison-wesley',
		name: 'Addison Wesley',
	},
	{
		desc: 'prentice-hall',
		name: 'Prentice Hall',
	},
	{
		desc: 'pearson',
		name: 'Pearson Publishing',
	},
	{
		name: "O'Realy",
		desc: "O'Realy publisher",
	},
]

const { Publisher } = createStore()

Publisher.sync({ force: false })
	.then(async () => {
		// eslint-disable-next-line no-restricted-syntax
		for await (const publisher of publishers) {
			Publisher.create(publisher)
		}
	})
	.then(() => {
		console.log('Sync table and Seed Publisher successfully.')
	})
	.catch(err => console.error(err))
