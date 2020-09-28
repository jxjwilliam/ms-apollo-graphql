import React from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Loading, Error, NotFound } from '../../mui'
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
	const [createTodo] = useMutation(ADD_TODO)
	const [updateTodo] = useMutation(UPDATE_TODO)
	const [deleteTodo] = useMutation(DELETE_TODO)

	if (loading) return <Loading />
	if (error) return <Error error={error} />
	if (!data) return <NotFound />

	const onQuery = (id) => {
		if(!called) todo({ variables: { id} })
		return row
	}

	const onMutation = (type, data) => {
		let variables;
		switch (type) {
			case 'ADD':
				variables = data.todo
				createTodo({ variables });
				break;
			case 'UPDATE':
				const {id, todo } = data
				updateTodo({variables: {id: parseInt(id), todo}})
				break;
			case 'DELETE':
				deleteTodo({variables: { id: data.id }})
				break;
			default:
				console.log('Onsubmit！！！', data);
		}
	}

	return <DataPrint data={data} />
}
