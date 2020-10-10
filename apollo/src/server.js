const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const schema = require('./schema')
const resolvers = require('./resolvers')
const { createStore } = require('./utils')

// follow the name-conventions of `fullstack-tutorial`
const { DBAPI, AuthorAPI, BookAPI, UserAPI, PublisherAPI } = require('./datasources')

require('dotenv').config()

// APOLLO_KEY: 8628
const { APOLLO_PORT: port } = process.env

// creates a sequelize connection once. NOT for every request
const store = createStore()

const typeDefs = gql`
	${schema}
`

const dataSources = () => ({
	userAPI: new UserAPI({ store }),
	authorAPI: new AuthorAPI({ store, Model: store.Author }),
	bookAPI: new DBAPI({ Model: store.Book }),
	publisherAPI: new DBAPI({ Model: store.Publisher }),
})

const server = new ApolloServer({
	schema: buildFederatedSchema([
		{
			typeDefs,
			resolvers,
		},
	]),
	dataSources,
})

server.listen({ port }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
