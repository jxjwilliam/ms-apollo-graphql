import React, {useEffect, useState} from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery,  } from '@apollo/client'
import { SimpleCard } from './mui'
// import Blog from './graphql'

require('dotenv').config()

const { REACT_APP_GATEWAY_PORT: GatewayPort } = process.env;
const client = new ApolloClient({
  uri: `http://localhost:${GatewayPort}`,
  cache: new InMemoryCache()
})

function PROFILE() {
  const GET_PROFILE = gql`
    {
      profile {
        id
        account
      }
    }
   `
  const { loading, error, data } = useQuery(GET_PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div>{JSON.stringify(data, null, 4)}</div>
}

function AUTHOR() {
  const GET_AUTHOR = gql`
    {
      author {
        id
        name
        username
        birthDate
      }
    }
   `
  const { loading, error, data } = useQuery(GET_AUTHOR);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  data.map((author, idx) => {
    return <SimpleCard data={data} key={idx}/>
  })
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <PROFILE/>
        <AUTHOR />
        {/*<Blog />*/}
        {/*<ExchangeRates/>*/}
      </div>
    </ApolloProvider>
  );
}

export default App;
