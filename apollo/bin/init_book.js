#!/usr/bin/env node

/**
 * deprecated:
 * const { createStore } = require('../src/utils')
 * const { Book } = createStore()
 */
const { Book } = require('../models')

const books = [
	{
		desc: 'design-patterns',
		title: 'Design Patterns - Elements of Reusable Object-Oriented Software',
		publisherId: 'addison-wesley',
	},
	{
		desc: 'refactoring',
		title: 'Refactoring - Improving the Design of Existing Code',
		publisherId: 'addison-wesley',
	},
	{
		desc: 'patterns-of-enterprise-application-architecture',
		title: 'Patterns of Enterprise Application Architecture',
		publisherId: 'addison-wesley',
	},
	{
		desc: 'domain-driven-design',
		title: 'Domain-Driven Design',
		publisherId: 'addison-wesley',
	},
	{
		desc: 'clean-code',
		title: 'Clean Code - A Handbook of Agile Software Craftsmanship',
		publisherId: 'prentice-hall',
	},
	{
		desc: 'agile-software-development',
		title: 'Agile Software Development, Principles, Patterns, and Practices',
		publisherId: 'pearson',
	},
]

Book.sync({ force: false })
	.then(async () => {
		// eslint-disable-next-line no-restricted-syntax
		for await (const book of books) {
			Book.create(book)
		}
	})
	.then(() => {
		console.log('Sync table and Seed Book successfully.')
	})
	.catch(err => console.error(err))
