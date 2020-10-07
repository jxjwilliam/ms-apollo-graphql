const { gql, makeExecutableSchema, mergeSchemas } = require('apollo-server')

// SDL: schema definition language 
const schema = gql`
	type Book {
		id: ID!
		title: String!
		desc: String
		author: Author!
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

	type Request {
		"2020-10-07"
    timestamp: String
    sku: String
		"1968-06-21"
    published: String
    query: String
    data: String
  }

	type Query {
		books: [Book]
		book(title: String!): Book
		authors: [Author]
		author(name: String!): Author
		Publishers: [Publisher]
		me(name: String!): Publisher
	}

	type Mutation {
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

	interface MutationResponse {
		code: String!
		success: Boolean!
		message: String!
	}

	type Message implements MutationResponse {
		code: String!
		success: Boolean!
		message: String!
		user: User
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

	}
`

const typeDefs = mergeSchemas({
	schemas: [schema],
})

module.exports = typeDefs
