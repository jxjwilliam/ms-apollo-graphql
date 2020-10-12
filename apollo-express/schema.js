const typeDefs = `
	type Todo {
		id: ID!
		title: String!
		description: String!
		completed: Boolean!
		createDate: String!
		priority: Priority!
	}

	enum Priority {
		LOW
		MEDIUM
		HIGH
	}

	type Query {
		todos: [Todo]
		todo(id: ID!): Todo
	}

	type Mutation {
		add_todo(todo: TodoInput): Todo!
		update_todo(id: ID!, todo: TodoInput): String!
		delete_todo(id: ID!): String!
	}
	
	input TodoInput {
		title: String!
		description: String!
		completed: Boolean! = false
		createDate: String!
		priority: Priority!
	}
`

module.exports = typeDefs
