const User = `
	type User {
		id: ID!
		name: String!
	}
`

const typeDefs = `
	type Query {
		
		users: [User!]!

		user(id: ID!): User
	}

	type Mutation {
		
		createUser(name: String!): User!

		updateUser(id: ID!, name: String): User

		deleteUser(id: ID!): User
	}

	type Subscription {

	}
`

/////////////////

// Query for all users
const QUERY_ALL_USERS = `
	query {
		users {
			id
			name
		}
	}
`

// Query a single user by their id
const QUERY_SINGLE_USER = `
	query {
		user(id: $id) {
			id
			name
		}
	}
`

// Create a new user
const CREATE_USER = `
	mutation {
		createUser(name: "Bob") {
			id
			name
		}
	}
`
