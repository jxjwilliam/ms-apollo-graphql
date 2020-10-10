const { gql } = require('apollo-server')

// Using `extend` allows us to combine both schemas inside developer tooling like Apollo VSCode and Apollo DevTools.
// SDL: schema definition language
const typeDefs = gql`
	type Book {
		id: ID!
		title: String!
		desc: String
		author: Author
	}

	type Author {
		id: ID!
		name: String!
		desc: String
		books: [Book]
	}

	type Publisher {
		id: ID!
		name: String!
		desc: String
	}

	type User {
		id: ID!
		username: String!
		name: String!
		email: String
		phone: String
	}

	type Request {
		timestamp: String
		sku: String
		createDate: String
	}

	extend type Query {
		books: [Book]
		book(id: ID!): Book
		authors: [Author]
		author(id: ID!): Author
		publishers: [Publisher]
		publisher(id: ID!): Publisher
		users: [User]
		user(id: ID!): User
		me(id: ID!): User
	}

	extend type Mutation {
		add_book(book: BookInput): Message
		edit_book(id: ID!, book: BookInput): Message
		delete_book(id: ID!): Message
		add_author(author: AuthorInput): Message
		edit_author(id: ID!, author: AuthorInput): Message
		delete_author(id: ID!): Message
		add_publisher(publisher: PublisherInput): Message
		edit_publisher(id: ID!, publisher: PublisherInput): Message
		delete_publisher(id: ID!): Message
	}

	type Message {
		code: String!
		success: Boolean!
	}

	input BookInput {
		title: String
		author: String
	}

	input AuthorInput {
		name: String
		desc: String
	}

	input PublisherInput {
		name: String!
		desc: String
	}
`

// const typeDefs = mergeSchemas({
// 	schemas: [schema],
// })

module.exports = typeDefs
