const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { buildFederatedSchema } = require('@apollo/federation')
const schema = require('./schema')
const resolvers = require('./resolvers')

require('dotenv').config()

const { APOLLO_EXPRESS_PORT: port } = process.env

const typeDefs = gql`
	${schema}
`

// http://localhost:8627/graphql
// uses `makeExecutableSchema` under the hood.
const server = new ApolloServer({
	schema: buildFederatedSchema([{ typeDefs, resolvers }]),
})

const app = express()

server.applyMiddleware({ app })

app.use(['/apollo-express', '/apollo',], (req, res) => {
	console.log('YOU CALL REST /apollo-express')
})

app.listen({ port }, () => {
	// eslint-disable-next-line no-console
	console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
})
