import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Error, Loading, NotFound } from '../../mui'
import SimpleCard from './SimpleCard'

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

export default function () {
	const { loading, error, data } = useQuery(GET_AUTHOR);

	if (loading) return <Loading />
	if (error) return <Error error={error} />
	if (!data) return <NotFound />

	if (Array.isArray(data)) {
		const list = data.map((author, idx) => <SimpleCard data={author} key={idx} />)
		return <>{list}</>;
	}
	else return <SimpleCard data={data} />
}
