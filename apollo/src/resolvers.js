const resolvers = {
	Query: {
		authors: async (parent, args, context, info) => {
			const { dataSources } = context
			const all = await dataSources.authorAPI.list()
			return all.reverse()
		},
		author(_, { id }, { dataSources }) {
			return dataSources.authorAPI.get(id)
		},
		books: async (parent, args, { dataSources }) => {
			return dataSources.bookAPI.list()
		},
		book(_, { id }, { dataSources }) {
			return dataSources.bookAPI.get(id)
		},
		users: async (_, args, { dataSources }) => {
			const instance = dataSources.userAPI
			const users = await instance.list()
			return users
		},
		user(_, { id }, { dataSources }) {
			return dataSources.userAPI.get(id)
		},
		me: async (_, args, { dataSources }) => {
			return dataSources.userAPI.get(args.id)
		},
		publishers(_, args, { dataSources }) {
			return dataSources.publisherAPI.list()
		},
		publisher(_, { id }, { dataSources }) {
			return dataSources.publisherAPI.get(id)
		},
	},

	Mutation: {
		add_author(_, { author }, { dataSources }) {
			return dataSources.authorAPI
				.post(author)
				.then(res => res.toJSON())
				.then(data => ({
					success: true,
					code: `add ${JSON.stringify(data)}`,
				}))
		},
		edit_author(_, { id, author }, { dataSources }) {
			return dataSources.authorAPI.put({ id, data: author }).then(data => ({
				success: true,
				code: `edit ${JSON.stringify(data)}`,
			}))
		},
		delete_author(_, { id }, { dataSources }) {
			return dataSources.authorAPI.delete(id).then(data => ({
				success: true,
				code: `delete id=${id}, count=${data}`,
			}))
		},
		add_book: (_, { book }, { dataSources }) => {
			return dataSources.bookAPI
				.post(book)
				.then(res => res.toJSON())
				.then(data => ({
					success: true,
					code: `add ${JSON.stringify(data)}`,
				}))
		},
		edit_book: (_, { id, book }, { dataSources }) => {
			return dataSources.bookAPI.put({ id, data: book }).then(data => ({
				success: true,
				code: `edit id=${id}, count=${data}`,
			}))
		},
		delete_book: (_, { id }, { dataSources }) => {
			return dataSources.bookAPI.delete(id).then(data => ({
				success: true,
				code: `delete id=${id}, count=${data}`,
			}))
		},
		add_publisher: (_, args, { dataSources }) => {
			// console.log(dataSources.publisherAPI)
			return dataSources.publisherAPI
				.post(args.publisher)
				.then(result => result.toJSON())
				.then(data => ({
					success: true,
					code: `add ${JSON.stringify(data)}`,
				}))
		},
		edit_publisher(_, { id, publisher }, { dataSources }) {
			return dataSources.publisherAPI.put({ id, data: publisher }).then(data => ({
				success: true,
				code: `edit id=${id}, count=${data}`,
			}))
		},
		delete_publisher(_, { id }, { dataSources }) {
			return dataSources.publisherAPI.delete(id).then(data => ({
				success: true,
				code: `delete id=${id}, count=${data}`,
			}))
		},
	},
}

module.exports = resolvers
