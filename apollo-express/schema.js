const typeDefs = `
	type Todo {
		id: ID!
		title: String!
		description: String!
		completed: Boolean!
		createDate: String!
	}

	type Query {
		todos: [Todo]
		todo(id: ID!): Todo
	}

	type Mutation {
		add_todo(todo: TodoInput): Todo!
		update_todo(id: ID!, todo: TodoInput): Todo
		delete_todo(id: ID!): Todo
	}

	input TodoInput {
		title: String!
		description: String!
		completed: Boolean! = false
		createDate: String!
	}
`

module.exports = typeDefs
