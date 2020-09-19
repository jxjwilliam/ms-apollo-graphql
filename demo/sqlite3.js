/* eslint-disable consistent-return */
const sqlite3 = require('sqlite3').verbose()

// open database in memory
let db = new sqlite3.Database(':memory:', err => {
	if (err) {
		console.error(err.message)
	}
	console.log('Connected to the in-memory SQlite database.')
})

// close the database connection
db.close(err => {
	if (err) {
		console.error(err.message)
	}
	console.log('Close the database connection.')
})

//
db = new sqlite3.Database('./sqlite3.db', err => {
	if (err) {
		console.error(err.message)
	}
	console.log('Connected to the sqlite3 database.')
})

db.serialize(() => {
	db.each(`SELECT PlaylistId as id, Name as name FROM playlists`, (err, row) => {
		if (err) console.error(err.message)
		else if (row) console.log(`${row.id}\t${row.name}`)
		else console.log('No record(s)')
	})
})

db.close(err => {
	if (err) {
		console.error(err.message)
	}
	console.log('Close the database connection.')
})
