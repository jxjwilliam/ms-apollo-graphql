import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/client'
import TabPanels from './mui/TabPanels'
import Blog from './express'
require('dotenv').config()

const { REACT_APP_GATEWAY_PORT: GatewayPort } = process.env;
const client = new ApolloClient({
  // uri: `http://localhost:${GatewayPort}`,
  uri: `http://localhost:8626/graphql`,
  cache: new InMemoryCache({
    addTypename: false
  })
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/*<TabPanels />*/}
        <Blog/>
      </div>
    </ApolloProvider>
  );
}

export default App;
