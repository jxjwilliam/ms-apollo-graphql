const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

require('dotenv').config()

const port = process.env.APOLLO_EXPRESS_PORT

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

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()

server.applyMiddleware({ app })

app.listen({ port }, () => {
	// eslint-disable-next-line no-console
	console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
})
