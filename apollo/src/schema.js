const { gql, makeExecutableSchema, mergeSchemas } = require('apollo-server')

const schema = gql`
	type Book {
		title: String!
		desc: String
		author: Author!
	}

	type Author {
		name: String!
		desc: String
		books: [Book]
	}

	type User {
		name: String!
		username: String!
		email: String
		phone: String
	}
`

const typeDefs = mergeSchemas({
	schemas: [schema],
})

module.exports = typeDefs
