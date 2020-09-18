const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

require('dotenv').config()

const port = process.env.GATEWAY_PORT
const express_port = process.env.EXPRESS_GRAPHQL_PORT
const apollo_port = process.env.APOLLO_EXPRESS_PORT

// Initialize an ApolloGateway instance and pass it an array of
// your implementing service names and URLs
const gateway = new ApolloGateway({
  serviceList: [
    {
      name: 'express port', url: `http://localhost:${express_port}`
    },
    {
      name: 'apollo server', url: `http://localhost:${apollo_port}`
    },
    // Define additional services here
  ],
});

// Pass the ApolloGateway to the Apollo Server constructor
const server = new ApolloServer({
  gateway,
  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
});

server.listen(port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
