const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const schema = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')
// const { createStore } = require('./utils')
const store = require('../models')

// follow the name-conventions of `fullstack-tutorial`
const { DBAPI, AuthorAPI } = require('./datasources')

require('dotenv').config()

// APOLLO_KEY: 8628
const { APOLLO_PORT: port } = process.env

// creates a sequelize connection once. NOT for every request
// const store = createStore()

const typeDefs = gql`
	${schema}
`

const dataSources = () => ({
	authorAPI: new AuthorAPI({ store, Model: store.Author }),
	bookAPI: new DBAPI({ Model: store.Book }),
	publisherAPI: new DBAPI({ Model: store.Publisher }),
	bookAuthorAPI: new DBAPI({ Model: store.BookAuthor }),
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
