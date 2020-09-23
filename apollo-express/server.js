const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { buildFederatedSchema } = require('@apollo/federation')

require('dotenv').config()

const { APOLLO_EXPRESS_PORT: port } = process.env

const typeDefs = gql`
	extend type Query {
		profile: Account
	}

	type Account {
		id: ID!
		account: String
	}
`

const resolvers = {
	Query: {
		profile() {
			return { id: '1', account: '@williamjxj' }
		},
	},
}

// uses `makeExecutableSchema` under the hood.
const server = new ApolloServer({
	schema: buildFederatedSchema([
		{
			typeDefs,
			resolvers,
		},
	]),
})

const app = express()

server.applyMiddleware({ app })

app.listen({ port }, () => {
	// eslint-disable-next-line no-console
	console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
})
