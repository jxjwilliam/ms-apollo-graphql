const { gql, makeExecutableSchema, mergeSchemas } = require('apollo-server')

// Using `extend` allows us to combine both schemas inside developer tooling like Apollo VSCode and Apollo DevTools.
const schema = gql`
	extend type Book {
		title: String!
		desc: String
		author: Author!
	}

	extend type Author {
		name: String!
		desc: String
		books: [Book]
	}

	extend type User {
		username: String!
		name: String!
		email: String
		phone: String
	}
`

const typeDefs = mergeSchemas({
	schemas: [schema],
})

module.exports = typeDefs
