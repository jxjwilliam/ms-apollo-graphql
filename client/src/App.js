import React, {useEffect} from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client'
import Album from './components/Album'

require('dotenv').config()

const {GATEWAY_PORT: gport } = process.env;
const client = new ApolloClient({
  uri: `http://localhost:${gport}`,
  cache: new InMemoryCache()
})

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return null;

  return <Album data={data}/>
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ExchangeRates/>
      </div>
    </ApolloProvider>
  );
}

export default App;
