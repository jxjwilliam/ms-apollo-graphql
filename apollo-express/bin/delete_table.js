#!/usr/bin/env node

const path = require('path')
const sqlite3 = require('sqlite3').verbose()

/**
 * DB: todo.db
 * Table: todos
 */
const dbpath = path.resolve(path.join(__dirname, 'todo.db'))

const database = new sqlite3.Database(dbpath, err => {
	if (err) console.error(err.message)
	console.log(`Connected to DB ${database}`)
})

database.run(`
	DROP TABLE IF EXISTS todos;
`)

database.close()
