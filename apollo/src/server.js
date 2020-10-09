const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
// const schema = require('./schema')
// const resolvers = require('./resolvers')
// const { createStore } = require('./utils')

// const AuthorAPI = require('./datasources/author')
// const BookAPI = require('./datasources/book')
// const UserAPI = require('./datasources/user')
// const PublisherAPI = require('./datasources/publisher')

require('dotenv').config()

// APOLLO_KEY
const { APOLLO_PORT: port } = process.env

// const store = createStore()

const typeDefs = gql`
	type Book {
		id: ID!
		name: String!
	}
	type Query {
		books: [Book]
	}
`
const server = new ApolloServer({
	schema: buildFederatedSchema([
		{
			typeDefs,
		},
	]),
})

server.listen({ port }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
