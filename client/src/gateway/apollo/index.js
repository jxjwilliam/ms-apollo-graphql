import React from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Loading, Error, NotFound } from '../../mui'
import CardList from './SimpleCard'
import { DataPrint } from '../../helpers/utils'
import {
  GET_AUTHORS,
  GET_AUTHOR,
  ADD_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR,
} from './Author'

import {
  GET_BOOKS,
  GET_BOOK,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK
} from './Book'

export default function () {
  const { loading, error, data } = useQuery(GET_AUTHORS)
  const [author, { called, data: row }] = useLazyQuery(GET_AUTHOR)
  const [create_author] = useMutation(ADD_AUTHOR)
  const [update_author] = useMutation(UPDATE_AUTHOR)
  const [delete_author] = useMutation(DELETE_AUTHOR)

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (!data) return <NotFound />

  const onQuery = (id) => {
    if (!called) author({ variables: { id } })
    return row
  }

  const refetchQueries = [{ query: GET_AUTHORS }]

  const onMutation = (type, data) => {
    switch (type) {
      case 'ADD':
        create_author({
          variables: { author: data },
          refetchQueries
        });
        break;
      case 'UPDATE':
        const { id, ...author } = data
        update_author({
          variables: { id, author },
          refetchQueries
        })
        break;
      case 'DELETE':
        delete_author({
          variables: { id: data },
          refetchQueries
        })
        break;
      default:
        console.log('%c Onsubmit', 'color:red', data);
    }
  }

  return (
    <>
      <CardList authors={data.authors} onSubmit={onMutation} />
      {row && <DataPrint data={row} onQuery={onQuery} />}
    </>
  )
}
