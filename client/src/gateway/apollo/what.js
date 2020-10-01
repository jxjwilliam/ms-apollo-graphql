import React from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Loading, Error, NotFound } from '../../mui'
import CardList from './CardList'
import { DataPrint } from '../../helpers/utils'
import {
  GET_BOOKS,
  GET_BOOK,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK
} from './Book'

export default function () {
  const { loading, error, data } = useQuery(GET_BOOKS)
  const [book, { called, data: row }] = useLazyQuery(GET_BOOK)
  const [create_book] = useMutation(ADD_BOOK)
  const [update_book] = useMutation(UPDATE_BOOK)
  const [delete_book] = useMutation(DELETE_BOOK)

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (!data) return <NotFound />

  const onQuery = (id) => {
    if (!called) book({ variables: { id } })
    return row
  }

  const refetchQueries = [{ query: GET_BOOKS }]

  const onMutation = (type, data) => {
    switch (type) {
      case 'ADD':
        create_book({
          variables: { book: data },
          refetchQueries
        });
        break;
      case 'UPDATE':
        const { id, ...book } = data
        update_book({
          variables: { id, book },
          refetchQueries
        })
        break;
      case 'DELETE':
        delete_book({
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
      <CardList books={data.books} onSubmit={onMutation} />
      {row && <DataPrint data={row} onQuery={onQuery} />}
    </>
  )
}
