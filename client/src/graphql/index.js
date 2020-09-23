import React, { useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { loader } from 'graphql.macro'
import { Loading, NotFound, Error } from '../mui'
import { DataPrint } from '../helpers/utils'

/**
 * { "kind": "Document",
    "definitions": [{kind: "OperationDefinition", operation: "query", variableDefinitions: Array(0), directives: Array(0), ...}],
    "loc": {} }
 */
const query = loader('./blog.gql')

function parseQuery (num) {
    return query.definitions[num]
}

function BlogQuery({ variables=null }) {
    const query = gql`
    query {
        Posts {
            id
            title
            description
            createDate
            author
        }
    }
    `
    const { loading, error, data } = useQuery(query)

    if (loading) return <Loading />
    if (error) return <Error error={error} />
    if (!data) return <NotFound />

    return (
        <div>
            <DataPrint data={data} />
        </div>
    )
}

function BlogMutation() {
    const [mutation, variables] = '';
    const [action, { loading, error, data }] = useMutation()

    action({ variables })

    if (loading) return <Loading />
    if (error) return <Error error={error} />
    if (!data) return <NotFound />

    return (
        <>
            {/*<Card1 data={data} />*/}
            <DataPrint data={data} />
        </>
    )
}

export default function (props) {
    useEffect(() => {

    }, [])
    return (
        <>
            <BlogQuery />
        </>
    )
}