const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')

require('dotenv').config()

const { APOLLO_PORT: port } = process.env

const typeDefs = gql`
	extend type Query {
		author: Author
	}

	type Author @key(fields: "id") {
		id: ID!
		name: String
		username: String
		birthDate: String
	}
`

const authors = [
	{
		id: '1',
		name: 'Ada Lovelace',
		birthDate: '1815-12-10',
		username: '@ada',
	},
	{
		id: '2',
		name: 'Alan Turing',
		birthDate: '1912-06-23',
		username: '@complete',
	},
]

const resolvers = {
	Query: {
		author() {
			return authors[0]
		},
	},
	Author: {
		__resolveReference(object) {
			return authors.find(user => user.id === object.id)
		},
	},
}

const server = new ApolloServer({
	schema: buildFederatedSchema([
		{
			typeDefs,
			resolvers,
		},
	]),
})

server.listen({ port }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
