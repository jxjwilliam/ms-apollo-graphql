const { ApolloServer } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const typeDefs = require('./schema')
// const resolvers = require('./resolvers')
const { createStore } = require('./utils')
// const UserAPI = require('./datasources/user')

require('dotenv').config()

const { APOLLO_PORT: port, APOLLO_KEY: key } = process.env

const store = createStore()

const dataSources = () => ({
	// userAPI: new UserAPI({ store }),
})

const server = new ApolloServer({
	schema: buildFederatedSchema([{ typeDefs }]),
})

server.listen({ port }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
