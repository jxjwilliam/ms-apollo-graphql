const path = require('path')
const graphql = require('graphql')
const sqlite3 = require('sqlite3').verbose()

/**
 * https://dev.to/jgilbertcastro/build-a-simple-blog-with-graphql-node-js-sqlite-and-vue-angular-or-reactjs-3923
 * https://github.com/jgilbertcastro/micro-blog/blob/master/micro-blog-api/graphql/post/post.js
 */

// create a database if no exists
const dbpath = path.resolve(path.dirname('.'), 'blog.db')
const database = new sqlite3.Database(dbpath)

// create a table to insert blog
const createBlogTable = () => {
	const query = `
        CREATE TABLE IF NOT EXISTS blogs (
        id integer PRIMARY KEY,
        title text,
        description text,
        createDate text,
        author text )`

	return database.run(query)
}

// call function to init the blog table
createBlogTable()

// create graphql blog object
const BlogType = new graphql.GraphQLObjectType({
	name: 'Blog',
	fields: {
		id: { type: graphql.GraphQLID },
		title: { type: graphql.GraphQLString },
		description: { type: graphql.GraphQLString },
		createDate: { type: graphql.GraphQLString },
		author: { type: graphql.GraphQLString },
	},
})

// create a graphql query to select all and by id
const queryType = new graphql.GraphQLObjectType({
	name: 'Query',
	fields: {
		// first query to select all
		Blogs: {
			type: graphql.GraphQLList(BlogType),
			resolve: (root, args, context, info) => {
				return new Promise((resolve, reject) => {
					// raw SQLite query to select from table
					database.all('SELECT * FROM blogs;', function (err, rows) {
						if (err) {
							reject([])
						}
						resolve(rows)
					})
				})
			},
		},
		// second query to select by id
		Blog: {
			type: BlogType,
			args: {
				id: {
					type: new graphql.GraphQLNonNull(graphql.GraphQLID),
				},
			},
			resolve: (root, { id }, context, info) => {
				return new Promise((resolve, reject) => {
					database.all('SELECT * FROM blogs WHERE id = (?);', [id], function (err, rows) {
						if (err) {
							reject(null)
						}
						resolve(rows[0])
					})
				})
			},
		},
	},
})

// mutation type is a type of object to modify data (INSERT,DELETE,UPDATE)
const mutationType = new graphql.GraphQLObjectType({
	name: 'Mutation',
	fields: {
		// mutation for create
		createBlog: {
			// type of object to return after create in SQLite
			type: BlogType,
			// argument of mutation createBlog to get from request
			args: {
				title: {
					type: new graphql.GraphQLNonNull(graphql.GraphQLString),
				},
				description: {
					type: new graphql.GraphQLNonNull(graphql.GraphQLString),
				},
				createDate: {
					type: new graphql.GraphQLNonNull(graphql.GraphQLString),
				},
				author: {
					type: new graphql.GraphQLNonNull(graphql.GraphQLString),
				},
			},
			resolve: (root, { title, description, createDate, author }) => {
				return new Promise((resolve, reject) => {
					// raw SQLite to insert a new blog in blog table
					database.run(
						'INSERT INTO blogs (title, description, createDate, author) VALUES (?,?,?,?);',
						[title, description, createDate, author],
						err => {
							if (err) {
								reject(null)
							}
							database.get('SELECT last_insert_rowid() as id', (error, row) => {
								resolve({
									id: row.id,
									title,
									description,
									createDate,
									author,
								})
							})
						}
					)
				})
			},
		},
		// mutation for update
		updateBlog: {
			// type of object to return afater update in SQLite
			type: graphql.GraphQLString,
			// argument of mutation createBlog to get from request
			args: {
				id: {
					type: new graphql.GraphQLNonNull(graphql.GraphQLID),
				},
				title: {
					type: new graphql.GraphQLNonNull(graphql.GraphQLString),
				},
				description: {
					type: new graphql.GraphQLNonNull(graphql.GraphQLString),
				},
				createDate: {
					type: new graphql.GraphQLNonNull(graphql.GraphQLString),
				},
				author: {
					type: new graphql.GraphQLNonNull(graphql.GraphQLString),
				},
			},
			resolve: (root, { id, title, description, createDate, author }) => {
				return new Promise((resolve, reject) => {
					// raw SQLite to update a blog in blog table
					database.run(
						'UPDATE blogs SET title = (?), description = (?), createDate = (?), author = (?) WHERE id = (?);',
						[title, description, createDate, author, id],
						err => {
							if (err) {
								reject(err)
							}
							resolve(`Blog #${id} updated`)
						}
					)
				})
			},
		},
		// mutation for update
		deleteBlog: {
			// type of object resturn after delete in SQLite
			type: graphql.GraphQLString,
			args: {
				id: {
					type: new graphql.GraphQLNonNull(graphql.GraphQLID),
				},
			},
			resolve: (root, { id }) => {
				return new Promise((resolve, reject) => {
					// raw query to delete from blog table by id
					database.run('DELETE from blogs WHERE id =(?);', [id], err => {
						if (err) {
							reject(err)
						}
						resolve(`Blog #${id} deleted`)
					})
				})
			},
		},
	},
})

// define schema with blog object, queries, and mustation
const schema = new graphql.GraphQLSchema({
	query: queryType,
	mutation: mutationType,
})

// export schema to use on index.js
module.exports = {
	schema,
}
