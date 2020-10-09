const { Sequelize } = require('sequelize')

module.exports.createStore = async () => {
	let db
	try {
		db = await new Sequelize({
			dialect: 'sqlite',
			storage: './store.sqlite',
		})
	} catch (err) {
		console.error(err)
	}

	const Book = db.define('book', {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		title: Sequelize.STRING,
		desc: Sequelize.STRING,
	})

	const Author = db.define('author', {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		name: Sequelize.STRING,
		desc: Sequelize.STRING,
	})

	const Publisher = db.define('publisher', {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		name: Sequelize.STRING,
		desc: Sequelize.STRING,
	})

	const User = db.define('user', {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		username: Sequelize.STRING,
		name: Sequelize.STRING,
		email: Sequelize.STRING,
		phone: Sequelize.STRING,
	})

	return { db, User, Book, Author, Publisher }
}
