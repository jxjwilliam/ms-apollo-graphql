import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/client'

require('dotenv').config()

const { REACT_APP_GATEWAY_PORT: GatewayPort } = process.env;
const client = new ApolloClient({
	uri: `http://localhost:${GatewayPort}`, // 8621
	cache: new InMemoryCache({ addTypename: false })
})

export default function ({children}) {
	return (
		<ApolloProvider client={client}>
			{children}
		</ApolloProvider>
	);
}
