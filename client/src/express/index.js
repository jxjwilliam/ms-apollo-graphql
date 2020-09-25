import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/client'
import Blog from './Blog'

require('dotenv').config()

const { REACT_APP_EXPRESS_PORT: ExpressPort } = process.env;
const client = new ApolloClient({
	uri: `http://localhost:${ExpressPort}/graphql`, // 8626
	cache: new InMemoryCache({ addTypename: false })
})

/**
 * index.js: ApolloProvider
 * Blog.js: gql, useQuery, useMutation
 * List.js: Material-Table list
 * DialogForm.js: dialog for crud
 */
export default function () {
	return (
		<ApolloProvider client={client}>
			<Blog/>
		</ApolloProvider>
	);
}
