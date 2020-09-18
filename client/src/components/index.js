import React from 'react'
import { ApolloClient, InMemoryCache, useQuery, useMutation, gql } from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:8621',
    cache: new InMemoryCache()
});

const GET = gql`
    query {

    }
`

const ADD = gql`
    mutation ($id: String!) {
        updateTodo(id: $id) {
            id
            type
        }
    }
`

export default function () {
    const { loading, error, data } = useQuery(GET, {
        variables: ''
    })

    const [updateTodo] = useMutation(ADD)

    if(loading) return <p>Loading...</p>
    if (error) return <p>Error...</p>

    return (
        <div>

        </div>
    )
}