#!/usr/bin/env node

const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const faker = require('faker')
const dayjs = require('dayjs')

/**
 * DB: blog.db
 * Table: blogs
 */
const dbpath = path.resolve(path.join(__dirname, 'blog.db'))
const INIT_NUMBER = 4

const generateRandomData = number => {
	return Array(number)
		.fill(0)
		.reduce(ary => {
			return [
				...ary,
				Promise.resolve({
					title: faker.name.jobTitle(),
					description: faker.lorem.words(),
					createDate: dayjs().format('YYYY-MM-DD'),
					author: faker.internet.userName(),
				}),
			]
		}, [])
}

const doInsert = database => ({ title, description, createDate, author }) => {
	console.log('---> ', `${title}, ${description}, ${createDate}, ${author}`)
	database.run(
		'INSERT INTO blogs (title, description, createDate, author) VALUES (?,?,?,?);',
		[title, description, createDate, author],
		err => {
			if (err) throw new Error(err)
		}
	)
}

const doSelect = database => () => {
	database.all('SELECT * from blogs;', (err, data) => {
		if (err) throw new Error(err)
		console.log(data)
	})
}

// MAIN

const database = new sqlite3.Database(dbpath, err => {
	if (err) throw new Error(err.message)

	console.log(`Connected to DB ${JSON.stringify(database)}`)

	// Promise.resolve('anything').then(() => console.log('resolved'))
	Promise.all(generateRandomData(INIT_NUMBER))
		.then(async data => {
			const addAction = doInsert(database)
			await data.map(addAction)
		})
		.then(doSelect(database))
		.finally(() => database.close())
})
