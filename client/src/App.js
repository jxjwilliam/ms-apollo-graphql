import React, {useEffect, useState} from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery,  } from '@apollo/client'
// import { Blog } from './mui'
import Blog from './graphql'

require('dotenv').config()
const { REACT_APP_GATEWAY_PORT: GatewayPort } = process.env;
console.log('!!!', GatewayPort )
const client = new ApolloClient({
  uri: `http://localhost:${GatewayPort}`,
  cache: new InMemoryCache()
})

function CALLME() {
  const ME111 = gql`
{
  me1 {
    username
  }
}
   `
  const { loading, error, data } = useQuery(ME111);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div>{JSON.stringify(data, null, 4)}</div>
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <CALLME/>
        {/*<Blog />*/}
        {/*<ExchangeRates/>*/}
      </div>
    </ApolloProvider>
  );
}

export default App;
