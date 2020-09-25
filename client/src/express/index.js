import React from 'react'
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client'

import { Container, CssBaseline } from '@material-ui/core'
import { Loading, NotFound, Error } from '../mui'
import { isEmpty, generatorBlogData } from '../helpers/utils'
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
	const [blog, { called, data: row } ] = useLazyQuery(GET_BLOG)
	const [createBlog] = useMutation(ADD_BLOG)
	const [updateBlog] = useMutation(UPDATE_BLOG)
	const [deleteBlog] = useMutation(DELETE_BLOG)

	if (loading) return <Loading />
	if (error) return <Error error={error.message} />
	if (!data) return <NotFound />

	const onQuery = (id) => {
		if(!called) blog({ variables: { id} })
		return row
	}

	const onMutation = (type, data) => {
		let variables;
		switch (type) {
			case 'ADD':
				variables = isEmpty(data) ? generatorBlogData() : data
				console.log('111', variables, createBlog)
				createBlog({ variables });
				break;
			case 'UPDATE':
				const {id, ...rest } = data
				console.log('222', data, updateBlog)
				updateBlog({variables: {id: parseInt(id), ...rest}})
				break;
			case 'DELETE':
				console.log('333', data, deleteBlog)
				deleteBlog({variables: { id: data }})
				break;
			default:
				console.log('Onsubmit！！！', data);
		}
	}

	return (
		<Container maxWidth={"lg"}>
			<CssBaseline/>
			<List data={data} onSubmit={onMutation} />
		</Container>
	)
}