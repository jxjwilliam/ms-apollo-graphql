const { ApolloServer } = require('apollo-server')
const { ApolloGateway } = require('@apollo/gateway')
const cors = require('cors')

require('dotenv').config()

const { GATEWAY_PORT, EXPRESS_GRAPHQL_PORT, APOLLO_EXPRESS_PORT } = process.env

console.log(`http://localhost:${EXPRESS_GRAPHQL_PORT}/graphql`)
console.log( `http://localhost:${APOLLO_EXPRESS_PORT}/graphql`)

// Initialize an ApolloGateway instance and pass it an array of
// your implementing service names and URLs
const gateway = new ApolloGateway({
  serviceList: [
    {
      name: 'express',
      url: `http://localhost:${EXPRESS_GRAPHQL_PORT}/graphql`,
    },
    {
      name: 'apollo',
      url: `http://localhost:${APOLLO_EXPRESS_PORT}/graphql`,
    },
    // Define additional services here
  ],
})

// Pass the ApolloGateway to the Apollo Server constructor
const server = new ApolloServer({
  gateway,
  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
})

server.listen(GATEWAY_PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
