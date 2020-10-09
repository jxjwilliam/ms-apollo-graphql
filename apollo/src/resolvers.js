const { paginateResults } = require('./utils')

const resolvers1 = {
	Query: {
		authors: async (_, { pageSize = 20, after }, { dataSources }) => {
			const all = await dataSources.authorAPI.list()
			all.reverse()
			const authors = paginateResults({
				after,
				pageSize,
				results: all,
			})
			const len = authors.length
			return {
				authors,
				cursor: len ? authors[len - 1].cursor : null,
				hasMore: len ? authors[len - 1].cursor !== all[all.length - 1].cursor : false,
			}
		},
		author(_, { id }, { dataSources }) {
			return dataSources.authorAPI.get({ id })
		},
		books: async (parent, args, { dataSources }) => {
			return dataSources.bookAPI.list()
		},
		book(_, { id }, { dataSources }) {
			dataSources.bookAPI.get({ where: { id } })
			return { id }
		},
		users: (_, args, { dataSources }) => {
			return dataSources.UserAPI.list()
		},
		me: async (_, __, { dataSources }) => {
			return dataSources.userAPI.findOrCreateUser()
		},
	},

	Mutation: {
		add_author(_, args) {
			console.log(args.author)
			return {
				success: true,
				message: 'add',
			}
		},
		edit_author(_, { id, author }) {
			console.log(id, author)
			return {
				success: true,
				message: 'edit',
			}
		},
		delete_author(_, { id }) {
			console.log(id)
			return {
				success: true,
				message: 'delete',
			}
		},
		add_book: (_, { book }) => {
			console.log(book)
			return {
				success: true,
				message: 'add-book',
			}
		},
		edit_book: (_, { id, book }) => {
			console.log(id, book)
			return {
				success: true,
				message: 'eit-book',
			}
		},
		delete_book: (_, { id }) => {
			console.log(id)
			return {
				success: true,
				message: 'delete-book',
			}
		},
		login: async (_, { email }, { dataSources }) => {
			const user = await dataSources.userAPI.findOrCreateUser({ email })
			if (user) {
				user.token = email.toString('base64')
				return user
			}
			return null
		},
	},

	Subscription: {},

	// https://www.apollographql.com/docs/apollo-server/api/apollo-federation/
	User: {
		__resolveReference(user, { fetchUserById }) {
			return fetchUserById(user.id)
		},
	},

	Author: {
		__resolveReference(object) {
			// return dataSources.authorAPI.find(user => user.id === object.id)
		},
	},
}

const resolvers = {}
module.exports = resolvers
