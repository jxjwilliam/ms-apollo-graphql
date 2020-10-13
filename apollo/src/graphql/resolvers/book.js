module.exports = {
	Query: {
		books: async (parent, args, { dataSources }) => {
			return dataSources.bookAPI.list()
		},
		book(_, { id }, { dataSources }) {
			return dataSources.bookAPI.get(id)
		},
	},

	Mutation: {
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
	},
}
