const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { buildFederatedSchema } = require("@apollo/federation");

require('dotenv').config()

const { APOLLO_EXPRESS_PORT: port } = process.env

const typeDefs = gql`
	extend type Query {
		me1: User
	}

	type User {
		id: ID!
		username: String
	}
`

const resolvers = {
	Query: {
		me1() {
			return { id: '1', username: '@williamjxj' }
		},
	},
}

// uses `makeExecutableSchema` under the hood.
const server = new ApolloServer({
	schema: buildFederatedSchema([
		{
			typeDefs,
			resolvers
		}
	])
})

const app = express()

server.applyMiddleware({ app })

app.listen({ port }, () => {
	// eslint-disable-next-line no-console
	console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
})
