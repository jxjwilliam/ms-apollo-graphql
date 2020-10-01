import React, { useEffect, useState } from 'react'
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { Container, CssBaseline } from '@material-ui/core'
import { Loading, NotFound, Error } from '../mui'
import { isEmpty, generatorBlogData, DataPrint } from '../helpers/utils'
import List from './List'

const GET_BLOGS = gql`
	query {
		Blogs {
			id
			title
			author
			createDate
			description
		}
	}
`

const GET_BLOG = gql`
	query Blog($id: ID!) {
		blog(id: $id) {
			id
			title
			description
			createDate
			author
		}
	}
`

const ADD_BLOG = gql`
	mutation ($title: String!, $description:String!, $createDate:String!, $author:String!) {
		createBlog(title: $title, description: $description, createDate: $createDate, author: $author)  {
			id
			title
			description
			createDate
			author
		}
	}
`

const UPDATE_BLOG = gql`
	mutation UpdateBlog($id: ID!, $title: String!, $description:String!, $createDate:String!, $author:String!) {
		updateBlog(id: $id, title: $title, description: $description, createDate: $createDate, author: $author)
	}
`

const DELETE_BLOG = gql`
	mutation ($id: ID!) {
		deleteBlog(id: $id)
	}
`

export default function () {
	const { loading, error, data } = useQuery(GET_BLOGS)
	// const [blog, { called, data: row } ] = useLazyQuery(GET_BLOG)
	const [createBlog] = useMutation(ADD_BLOG)
	const [updateBlog] = useMutation(UPDATE_BLOG)
	const [deleteBlog] = useMutation(DELETE_BLOG)

	if (loading) return <Loading />
	if (error) return <Error error={error.message} />

	// const onQuery = (id) => {
	// 	if(!called) blog({ variables: { id} })
	// 	return row
	// }

	const refetchQueries = [{ query: GET_BLOGS }]

	const onMutation = (type, data) => {
		let variables;
		switch (type) {
			case 'ADD':
				variables = isEmpty(data) ? generatorBlogData() : data
				createBlog({ variables, refetchQueries });
				break;
			case 'UPDATE':
				const { id, ...rest } = data
				updateBlog({ variables: { id: parseInt(id), ...rest }, refetchQueries })
				break;
			case 'DELETE':
				deleteBlog({ variables: { id: data }, refetchQueries })
				break;
			default:
				console.log('%c Onsubmit', 'color:red', data);
		}
	}

	return isEmpty(data) ? null : (
		<Container maxWidth={"lg"}>
			<CssBaseline />
			<List data={data} onSubmit={onMutation} />
			{/*<DataPrint data={row} />*/}
		</Container>
	)
}