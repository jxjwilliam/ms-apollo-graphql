const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

require('dotenv').config()

const { APOLLO_EXPRESS_PORT } = process.env

const typeDefs = gql`
	type Query {
		hello: String
	}
`

const resolvers = {
	Query: {
		hello: () => 'Hello the World from apollo server !',
	},
}

// uses `makeExecutableSchema` under the hood.
const server = new ApolloServer({
	typeDefs: './schema',
	resolvers: './resolver',
})

const app = express()

server.applyMiddleware({ app })

app.listen({ port: APOLLO_EXPRESS_PORT }, () => {
	// eslint-disable-next-line no-console
	console.log(`🚀 Server ready at http://localhost:${APOLLO_EXPRESS_PORT}${server.graphqlPath}`)
})
