import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Album from './Album'
import { Loading, Error, NotFound } from './'

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export default function () {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (!data) return <NotFound />

  return <Album data={data} />
}