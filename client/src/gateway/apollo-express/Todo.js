import React from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Loading, Error, NotFound } from '../../mui'
import CardList from './CardList'
import { DataPrint } from '../../helpers/utils'

const GET_TODOS = gql`
	query {
		todos {
			id
			title
			description
			completed
			createDate
		}
	}
`

const GET_TODO = gql`
	query ($id: ID!) {
		todo(id: $id) {
			id
			title
			description
			completed
			createDate
		}
	}
`

const ADD_TODO = gql`
	mutation ($todo: TodoInput) {
		add_todo(todo: $todo) {
			id
			title
			description
			completed
			createDate
		}
	}
`

const UPDATE_TODO = gql`
	mutation ($id: ID!, $todo: TodoInput) {
		update_todo(id: $id, todo: $todo)
	}
`

const DELETE_TODO = gql`
	mutation ($id: ID!) {
		delete_todo(id: $id)
	}
`

export default function () {
	const { loading, error, data } = useQuery(GET_TODOS)
	const [todo, { called, data: row } ] = useLazyQuery(GET_TODO)
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

	return <CardList todos={data.todos} onSubmit={onMutation} />
}
