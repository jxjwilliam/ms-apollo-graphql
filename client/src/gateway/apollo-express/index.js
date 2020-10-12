import React, { useCallback, useMemo } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Loading, Error, NotFound } from '../../mui'
import CardList from './CardList'
import { DataPrint } from '../../helpers/utils'
import {
  GET_TODOS,
  GET_TODO,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from './Todo_sdl'

export default function () {
  const { loading, error, data } = useQuery(GET_TODOS)
  const [todo, { called, data: row }] = useLazyQuery(GET_TODO)
  const [create_todo] = useMutation(ADD_TODO)
  const [update_todo] = useMutation(UPDATE_TODO)
  const [delete_todo] = useMutation(DELETE_TODO)

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (!data) return <NotFound />

  const onQuery = (id) => {
    if (!called) todo({ variables: { id } })
    return row
  }

  const refetchQueries = [{ query: GET_TODOS }]

  const onMutation = (type, data) => {
    switch (type) {
      case 'ADD':
        create_todo({
          variables: { todo: data },
          refetchQueries
        });
        break;
      case 'UPDATE':
        const { id, ...todo } = data
        update_todo({
          variables: { id, todo },
          refetchQueries
        })
        break;
      case 'DELETE':
        delete_todo({
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
      <CardList todos={data.todos} onSubmit={onMutation} />
      {row && <DataPrint data={row} onQuery={onQuery} />}
    </>
  )
}
