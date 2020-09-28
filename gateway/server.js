const { ApolloServer } = require('apollo-server')
const { ApolloGateway } = require('@apollo/gateway')

require('dotenv').config()

const { GATEWAY_PORT, EXPRESS_GRAPHQL_PORT, APOLLO_EXPRESS_PORT, APOLLO_PORT } = process.env

/**
 * Not identified by gateway. so extract `express` as a parallel services along with `gateway`
 * { name: 'countries2',	url: `https://countries-274616.ew.r.appspot.com/` },
 * { name: 'express', url: `http://localhost:${EXPRESS_GRAPHQL_PORT}/graphql` },
 */
const gateway = new ApolloGateway({
	serviceList: [
		{
			name: 'apollo-express',
			url: `http://localhost:${APOLLO_EXPRESS_PORT}/graphql`, // 8627
		},
		{
			name: 'apollo',
			url: `http://localhost:${APOLLO_PORT}/graphql`, // 8628
		},
	],
	__exposeQueryPlanExperimental: false,
})

// Pass the ApolloGateway to the Apollo Server constructor
const server = new ApolloServer({
	gateway,

	engine: false,

	// Disable subscriptions (not currently supported with ApolloGateway)
	subscriptions: false,
})

server.listen(GATEWAY_PORT).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
