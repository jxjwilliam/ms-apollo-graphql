module.exports = {
	Query: {
		publishers(_, args, { dataSources }) {
			return dataSources.publisherAPI.list()
		},
		publisher(_, { id }, { dataSources }) {
			return dataSources.publisherAPI.get(id)
		},
	},

	Mutation: {
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
