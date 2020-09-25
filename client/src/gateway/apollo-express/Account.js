import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Loading, Error, NotFound } from '../../mui'
import { DataPrint } from '../../helpers/utils'

const GET_ACCOUNT = gql`
    {
      profile {
        id
        account
      }
    }
   `

export default function () {
	const { loading, error, data } = useQuery(GET_ACCOUNT);

	if (loading) return <Loading />
	if (error) return <Error error={error} />
	if (!data) return <NotFound />

	return <DataPrint data={data} />
}
