const links = [
	{
		id: 'link-0',
		url: 'www.howtographql.com',
		description: 'Fullstack tutorial for GraphQL',
	},
]

const resolvers = {
	Query: {
		info: () => `Resolvers`,

		feed: () => links,
	},
	Mutation: {
		// 2
		post: (parent, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url,
			}
			links.push(link)
			return link
		},
	},
}
