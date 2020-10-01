const path = require('path')
const sqlite3 = require('sqlite3').verbose()

// TODO: mongoose, sqlite3 ?
const dbpath = path.resolve(path.dirname('.'), 'todo.db')
const database = new sqlite3.Database(dbpath)

const createTodoTable = () => {
	const query = `
        CREATE TABLE IF NOT EXISTS todos (
        id integer PRIMARY KEY,
        title text,
        description text,
        createDate text,
        completed integer )`

	return database.run(query)
}

createTodoTable()

const resolvers = {
	Query: {
		todos() {
			return new Promise((resolve, reject) => {
				database.all('SELECT * FROM todos;', function (err, rows) {
					if (err) reject([])
					resolve(rows)
				})
			})
		},
		todo(_, args) {
			const { id } = args
			return new Promise((resolve, reject) => {
				database.all('SELECT * FROM todos WHERE id = (?);', [id], function (err, rows) {
					if (err) reject(null)
					resolve(rows[0])
				})
			})
		},
	},
	Mutation: {
		add_todo(_, args) {
			const { title, description, createDate, completed } = args.todo
			// eslint-disable-next-line max-len
			// SQLite does not have a separate Boolean storage class. Instead, Boolean values are stored as integers 0 (false) and 1 (true).
			const isCompleted = completed ? 1 : 0
			return new Promise((resolve, reject) => {
				database.run(
					'INSERT INTO todos (title, description, createDate, completed) VALUES (?,?,?,?);',
					[title, description, createDate, isCompleted],
					err => {
						if (err) reject(null)
						database.get('SELECT last_insert_rowid() as id', (error, row) => {
							resolve({
								id: row.id,
								title,
								description,
								createDate,
								completed,
							})
						})
					}
				)
			})
		},
		update_todo(_, args) {
			const {
				id,
				todo: { title, description, createDate, completed },
			} = args
			const isCompleted = completed ? 1 : 0
			return new Promise((resolve, reject) => {
				database.run(
					'UPDATE todos SET title = (?), description = (?), createDate = (?), completed = (?) WHERE id = (?);',
					[title, description, createDate, isCompleted, id],
					err => {
						if (err) reject(err)
						resolve(`Todo #${id} updated`)
					}
				)
			})
		},
		delete_todo(_, { id }) {
			return new Promise((resolve, reject) => {
				database.run('DELETE from todos WHERE id =(?);', [id], err => {
					if (err) reject(err)
					resolve(`Todo #${id} deleted`)
				})
			})
		},
	},
}

module.exports = resolvers
