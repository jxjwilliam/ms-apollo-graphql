const { gql } = require('apollo-server')

const typeDefs = gql`
	type Book {
		id: ID!
		title: String!
		author: Author
	}

	type Author {
		id: ID!
		name: String
		books: [Book]
	}

	type User @key(fields: "id") {
		id: ID!
		email: String!
		profileImage: String
		username: String
	}

	type Query {
		authors: [Author]!
		author(id: ID!): Author
		books: [Book]!
		book(id: ID!): Book
		me: User
	}

	type Mutation {
		add_author(author: AuthorInput): UpdateResponse!
		edit_author(id: ID!, author: AuthorInput): UpdateResponse!
		delete_author(id: ID!): UpdateResponse!
		add_book(book: BookInput): UpdateResponse!
		edit_book(id: ID!, book: BookInput): UpdateResponse!
		delete_book(id: ID!): UpdateResponse!
	}

	input AuthorInput {
		name: String
	}

	input BookInput {
		title: String!
	}

	type UpdateResponse {
		success: Boolean!
		message: String
	}
`

module.exports = typeDefs
