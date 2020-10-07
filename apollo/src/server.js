const { ApolloServer } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { createStore } = require('./utils')

const AuthorAPI = require('./datasources/author')
const BookAPI = require('./datasources/book')
const UserAPI = require('./datasources/user')

require('dotenv').config()

const { APOLLO_PORT: port, APOLLO_KEY: key } = process.env

const store = createStore()

const server = new ApolloServer({
	schema: buildFederatedSchema([
		{
			typeDefs,
			resolvers,
			dataSources: () => ({
				authorAPI: new AuthorAPI({ store }),
				bookAPI: new BookAPI({ store }),
				userAPI: new UserAPI({ store }),
			}),
		},
	]),
})

server.listen({ port }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
