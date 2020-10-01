import { gql } from '@apollo/client'

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

export {
	GET_TODOS,
	GET_TODO,
	ADD_TODO,
	UPDATE_TODO,
	DELETE_TODO,
}
