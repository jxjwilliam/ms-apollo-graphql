module.exports = {
	Query: {
		authors: async (parent, args, context) => {
			const { dataSources } = context
			const all = await dataSources.authorAPI.list()
			return all.reverse()
		},
		author(_, { id }, { dataSources }) {
			return dataSources.authorAPI.get(id)
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
	},
}
