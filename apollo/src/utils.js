const { Sequelize } = require('sequelize')

module.exports.paginateResults = ({
	after: cursor,
	pageSize = 20,
	results,
	// can pass in a function to calculate an item's cursor
	getCursor = () => null,
}) => {
	if (pageSize < 1) return []

	if (!cursor) return results.slice(0, pageSize)
	const cursorIndex = results.findIndex(item => {
		// if an item has a `cursor` on it, use that, otherwise try to generate one
		const itemCursor = item.cursor ? item.cursor : getCursor(item)

		// if there's still not a cursor, return false by default
		return itemCursor ? cursor === itemCursor : false
	})

	// eslint-disable-next-line no-nested-ternary
	return cursorIndex >= 0
		? cursorIndex === results.length - 1 // don't let us overflow
			? []
			: results.slice(cursorIndex + 1, Math.min(results.length, cursorIndex + 1 + pageSize))
		: results.slice(0, pageSize)
}

module.exports.createStore = () => {
	const db = new Sequelize({
		dialect: 'sqlite',
		storage: './store.sqlite',
	})

	const User = db.define('user', {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		name: Sequelize.STRING,
		username: Sequelize.STRING,
		email: Sequelize.STRING,
		phone: Sequelize.STRING
	})

	const Book = db.define('book', {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		id: Sequelize.INTEGER,
		title: Sequelize.STRING,
		desc: Sequelize.STRING,
	})

	const Author = db.define('author', {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		id: Sequelize.INTEGER,
		name: Sequelize.STRING,
		desc: Sequelize.STRING,
	})

	return { db, User, Book, Author }
}
